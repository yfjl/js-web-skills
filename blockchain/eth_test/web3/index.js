Web3 = require('web3');

// for (var i = 0; i < 500; i++) { personal.newAccount('a2259303');}
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8555"));
}
// console.log(web3);

console.log('isConnected:',web3.isConnected())
// console.log('accounts:',web3.eth.accounts)


let addr1='0x1a1394afe7778b134f9dc17e4904febfae29db5d',
    addr2='0x8cad3bd6095afd426c3a8b6e6981df1ee343ad3d';

// var balance = web3.eth.getBalance("0x1a1394afe7778b134f9dc17e4904febfae29db5d");//380000000000000000000
let balance = web3.eth.getBalance("0x8cad3bd6095afd426c3a8b6e6981df1ee343ad3d"); //20000
balance && console.log('balance:',balance.toNumber()); // instanceof BigNumber


// var sync = web3.eth.syncing;
// console.log(sync);


// console.log(web3.personal.unlockAccount(addr1,'bajian'));//true
// lockAccount: { [Function: send] request: [Function: bound ], call: 'personal_lockAccount' },
// unlockAccount: { [Function: send] request: [Function: bound ], call: 'personal_unlockAccount' },



let sendTransaction = (from,to,value)=>{
    web3.personal.unlockAccount(addr1,'bajian',20)
    let tx_object={
        from:from,
        to:to,
        value:value,
    }

    web3.eth.sendTransaction(tx_object, function(err, transactionHash) {
        if (!err)
            console.log('transactionHash:',transactionHash); // "0x3449e15e12707d6a9f708d9b24c510bb29859632c8a2fa8482494cf91d0d387f"
        else
            console.error('sendTransaction err',err)
    });
}
// sendTransaction(addr1,addr2,1111)

// for (var i=0;i <=9;i++){
//     sendTransaction(addr1,addr2,1111)
// }

let scanBlock = (num)=>{
    web3.eth.getBlock(num, function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
    })
}

scanBlock(77)
/*
{
  difficulty: 131072,
  extraData: "0xd983010804846765746888676f312e31302e318664617277696e",
  gasLimit: 3386690,
  gasUsed: 105000,
  hash: "0x03f3ea87f734b6d52a46c0449431007967d2876d1f8b790d2922bb0dcbb1a9c0",
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  miner: "0x1a1394afe7778b134f9dc17e4904febfae29db5d",
  mixHash: "0x8bf06a7a1f97a3748edb703d5d77bf0d60cde27849fc0af3475894984fd0f5d6",
  nonce: "0x1b26f8a5897e94e9",
  number: 77,
  parentHash: "0x5c919e552747b298f957c8de8f8eaa35e5ed61013c3de0bd9074d3c6802d231b",
  receiptsRoot: "0x17135c4d9eab6bc504ed9a8d61ceeec2230870a69885b5627636fdd6907566ea",
  sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  size: 1065,
  stateRoot: "0x136bea64d73b35298f4a71e7a05ab21cdaac5e82290b47abec9d82ab1a3e1c79",
  timestamp: 1524126951,
  totalDifficulty: 10384581,
  transactions: ["0x3449e15e12707d6a9f708d9b24c510bb29859632c8a2fa8482494cf91d0d387f", "0x70b4399a3f3ef49b2176d27b80d5f1cde2e6ad8e34d945daf7f7709e13ae86ce", "0xacb3a91b876b05f028afea09ad5ebc998981bf625fe9a0b51eef4c51ee640761", "0x4d91d82fa264875b9fe9b553c06170846d63828e9b0104a779ede304c0cd6a2a", "0xe03fe8f741236098eaf71739c1e865e5ff37d29d19fff0fc1b5d237dd6c10b58"],
  transactionsRoot: "0x97484ed3ae29295934dc7cc884fa96758b5bacac6afec645ad168d0856b0bdb5",
  uncles: []
}

*/



// let transaction = web3.eth.getTransaction('0x3449e15e12707d6a9f708d9b24c510bb29859632c8a2fa8482494cf91d0d387f');
// let transaction = web3.eth.getTransaction('0x03a52dfff7e14dfb36b1f90966224dd4de7e4cc274d4cbe822e730a722f683a1');
// console.log(transaction);
/*
{ blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockNumber: null,
    from: '0x1a1394afe7778b134f9dc17e4904febfae29db5d',
    gas: 90000,
    gasPrice: BigNumber { s: 1, e: 10, c: [ 18000000000 ] },
    hash: '0x3449e15e12707d6a9f708d9b24c510bb29859632c8a2fa8482494cf91d0d387f',
        input: '0x',
    nonce: 1,
    to: '0x8cad3bd6095afd426c3a8b6e6981df1ee343ad3d',
    transactionIndex: 0,
    value: BigNumber { s: 1, e: 3, c: [ 1234 ] },
    v: '0x1b',
        r: '0x1e4d9c71d43b40fb0a6044d6a6c63c073d5c8d7b0df8a877155cc2b8802dff76',
    s: '0x63c3c7896b69cd8a1915b7c43e8b71f57fda0e8764ed721f84470e7c846c5e44' }
*/


// Web3 JavaScript app API for 0.2x.x
//https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethaccounts
//注意 1.0的版本还没发布，api差异大

