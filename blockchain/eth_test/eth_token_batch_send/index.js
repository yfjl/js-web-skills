/*
* @author bajian
* @usage
* node index.js 正式网络
* node index.js test 测试网络
* 浏览器
* https://etherscan.io/address/0x08206b0eb10751ac289aae62f250dbdc0314cc18
* https://ropsten.etherscan.io/address/0x08206b0eb10751ac289aae62f250dbdc0314cc18
* */

let Web3 = require('web3')
let fs = require('fs')
let csv = require('fast-csv')
let BigNumber = require('bignumber.js')
let Tx = require('ethereumjs-tx');

//代币合约地址
let contractAddress = '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0'
//用户转账记录，目前只支持csv文件
let csvFile = './list.csv'
//keystore文件
let keyStoreFile = '/Users/lumingwang/Projects/bulksend/keystore'
//keystore密码
let password = 'C0mm0nPass'
//发币地址的eth私钥
let privateKey = 'b9c2e899cce17b8e216513a6ff2521e735d9d9d9164334b467a646fefd68b802'
//gas价格（GWEI）
let gasPrice = 10 //参考这里的最小值，可以省不少手续费：https://etherscan.io/gastracker
let gasLimit = 80000



let mainProvider = 'https://mainnet.infura.io/gsp3CCkZS6MxsrUYKe1W'
let testProivder = 'https://ropsten.infura.io/gsp3CCkZS6MxsrUYKe1W'
let allocData = []
let index = 0
let invalidEntries = 0
let web3
let contract

function readFile(file) {
    return new Promise((resolve, reject) => {
        var stream = fs.createReadStream(file)
        let batch = 0
        console.log(`开始读取用户数据`);
        var csvStream = csv()
            .on("data", function (data) {
                if (index == 0) {
                    index++
                    return
                }
                let isAddress = web3.utils.isAddress(data[0])
                let amount = new BigNumber(data[1])
                if (isAddress && data[0] != null && data[0] != '' && amount.gt(0)) {
                    allocData.push({ address: data[0], amount: amount })
                }
                else {
                    console.log('无效输入', data[0], data[1])
                    invalidEntries++
                }
                index++
            })
            .on("end", function () {
                console.log('读取用户数据完成')
                if (invalidEntries > 0) {
                    console.log('用户数据有误。请先修改数据')
                    reject()
                } else {
                    resolve()
                }
                //Add last remainder batch
            });
        stream.pipe(csvStream);
    })
}

let generateAndSendTokenTransaction = async (from, to, amount, ercAddress, privKey, nounce, gasPrice, chainId) => {
    var rawTransaction = {
        from: from,
        "nonce": web3.utils.toHex(nounce),
        "gasPrice": web3.utils.toHex(web3.utils.toWei(gasPrice.toString(), 'gwei')),
        "gasLimit": web3.utils.toHex(gasLimit),
        to: ercAddress,
        "value": "0x0",
        "data": contract.methods.transfer(to, amount).encodeABI(),
        "chainId": chainId
    }
    var tx = new Tx(rawTransaction)
    privKey = new Buffer(privKey.slice(2), 'hex')
    tx.sign(Buffer.from(privKey))
    var serializedTx = tx.serialize()
    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log(`... ... send finished,to:${to} txid:${receipt.transactionHash}`);
}

let loadAccountByPrivateKey = (privateKey)=>{
    if (privateKey && privateKey.indexOf('0x') == -1) {
        privateKey = '0x' + privateKey
    }
    try {
         return web3.eth.accounts.privateKeyToAccount(privateKey);

    } catch (error) {
        console.log('无效 privateKey ：', privateKey);
        return
    }
}

let loadContractByABI = (abiDir,contractAddr)=>{
    let abiArray = JSON.parse(fs.readFileSync(abiDir, 'utf-8'))
    return new web3.eth.Contract(abiArray, contractAddr)
}

let loadAccountByKeystore = (keyStoreFileDir)=>{
    let keyStoreData
    try {
        keyStoreData = fs.readFileSync(keyStoreFileDir)
    } catch (error) {
        console.log('无法读取指定的keystore文件', keyStoreFileDir);
        return
    }

    let keyStoreJSON
    let account
    try {
        keyStoreJSON = JSON.parse(keyStoreData)
        if (!keyStoreJSON.crypto) {
            keyStoreJSON.crypto = keyStoreJSON.Crypto
        }
        account = web3.eth.accounts.decrypt(keyStoreJSON, password);
        console.log('发币账户是:', account.address)

    }
    catch (error) {
        console.error(error)
        console.error('请指定有效的keystore文件')
        return
    }
    return account
}

let main = async () => {

    let argv = process.argv.slice(2)[0]
    let chainId = 0x001
    if (argv == 'test') {
        web3 = new Web3(new Web3.providers.HttpProvider(testProivder))
        chainId = 0x003
        console.log('test net')
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(mainProvider))
        console.log('main net')
    }
    contract = loadContractByABI('erc20contract.json',contractAddress)
    let decimals = await contract.methods.decimals().call()

    // let account = loadAccountByKeystore(keyStoreFile) //keystore 导入 ，二选一
    let account = loadAccountByPrivateKey(privateKey) //私钥导入 ，二选一

    try {
        await readFile(csvFile)
    } catch (error) {
        return
    }

    if (account && allocData) {
        let total = allocData.reduce(
            (prev, curr) => { return prev.plus(curr.amount) },
            new BigNumber(0)
        )
        console.log(`开始批量发币。发币总额为 ${total.toNumber()} ， 交易笔数为 ${allocData.length}`)
    }
    else {
        console.log('出现问题')
    }
    // 关键
    for (let i = 0; i < allocData.length; i++) {
        try {
            let data = allocData[i]
            let nounce = await web3.eth.getTransactionCount(account.address)
            console.log(`处理第${i + 1}交易, 地址:${data.address} 数量:${data.amount.toNumber()} nounce:${nounce}`)
            let amount = data.amount.multipliedBy(new BigNumber(10).pow(decimals))
            let result = await generateAndSendTokenTransaction(
                account.address,
                data.address,
                amount.toNumber(),
                contractAddress,
                account.privateKey,
                nounce,
                gasPrice,
                chainId
            )
        }
        catch (error) {
            console.error('!!!!交易失败',error)
        }
    }
}

main()


