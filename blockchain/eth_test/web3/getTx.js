/*
A script that gets the transaction info from a transaction hash/ID, then shows the result in the console.

For an explanation of this code, navigate to the wiki https://github.com/ThatOtherZach/Web3-by-Example/wiki/Get-Transaction
*/

// Get the web3 Module
var Web3 = require('web3');

// Show web3 where it needs to look for the Ethereum node.
// web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/gsp3CCkZS6MxsrUYKe1W'));
var getTx =(ethTx)=>{

// Define a normal transaction hash to use
    //var ethTx = ('0x5b5a7a6aa51eb534d440438a16e7db5d2b6eaeb4ca01af20a39a82f4e35401b4');

// Use web3 getTransaction to get the json transaction object, then we log only the values we want
    web3.eth.getTransaction(ethTx, function(err, result) {
        if (!err) {

            console.log('result: ' ,result); // Log the from address
            console.log('confirmations: ' ,blockNum - result.blockNumber,blockNum); // Log the from address
            console.log('From Address: ' + result.from); // Log the from address
            console.log('To Address: ' + result.to); // Log the to address
            console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether'))); // Get the value, convert from Wei to Ether and log it
        }
        else {
            console.log('Error!', err); // Dump errors here
        }
    });

    //
    // web3.eth.getTransactionReceipt(ethTx, function(err, result) {
    //     if (!err) {
    //
    //         console.log('getTransactionReceipt result: ' ,result); // Log the from address
    //         console.log('confirmations: ' ,blockNum - result.blockNumber,blockNum); // Log the from address
    //         console.log('From Address: ' + result.from); // Log the from address
    //         console.log('To Address: ' + result.to); // Log the to address
    //         console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether'))); // Get the value, convert from Wei to Ether and log it
    //     }
    //     else {
    //         console.log('Error!', err); // Dump errors here
    //     }
    // });
    // out of gas
    // { blockHash: '0x3120ec8310c53ae053646ffdb06f6724f653a5d145b6c2cb89e90d80002a4857',
    //     blockNumber: 5855783,
    //     contractAddress: null,
    //     cumulativeGasUsed: 7600603,
    //     from: '0x4aed9b8f6ef4f65e2a88a21d93591f5a558ddaad',
    //     gasUsed: 25200,
    //     logs: [],
    //     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    //     status: false,
    //     to: '0x1871e5063b3734c0235028bf8a0212cf0b8559cc',
    //     transactionHash: '0x0abd479764ef4e34f404c900aa7cdc1944875aec1d3d6189691ffd0b2d2075dd',
    //     transactionIndex: 211 }

    //success
    // { blockHash: '0x1131029c47fd3ba5c96769d5dc702e44071b43ffdfeb179ddc035dd06b8499f5',
    //     blockNumber: 5856425,
    //     contractAddress: null, //The contract address created, if the transaction was a contract creation, otherwise null.
    //     cumulativeGasUsed: 7950629,
    //     from: '0x13072002f8830e7360343fd861225afe1ec80a9a',
    //     gasUsed: 52129,
    //     logs:
    //     [ { address: '0x0c8bD5D1681aec511617d5385B23D7964931D635',
    //         topics: [Array],
    //         data: '0x000000000000000000000000000000000000000000000035efb479876ae70000',
    //         blockNumber: 5856425,
    //         transactionHash: '0xb287259694427959a0179706b124208f70169cf132bb689e1f56c13e64b515e7',
    //         transactionIndex: 47,
    //         blockHash: '0x1131029c47fd3ba5c96769d5dc702e44071b43ffdfeb179ddc035dd06b8499f5',
    //         logIndex: 210,
    //         removed: false,
    //         id: 'log_548d7747' } ],
    //         logsBloom: '0x00000000000000000000000000000000000000000000000000001000000000000000000400000000000000000000000000000000004000000000000000000200000000000000000000000008000000000000000000000000000000000020000000000040000000000000000000000000000000000000000000000010000000000800000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000002000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    //     status: true,
    //     to: '0x0c8bd5d1681aec511617d5385b23d7964931d635',
    //     transactionHash: '0xb287259694427959a0179706b124208f70169cf132bb689e1f56c13e64b515e7',
    //     transactionIndex: 47 }


};
web3.eth.getBlockNumber()
    .then((blockNumber)=>{
        blockNum = blockNumber;

        // getTx('0x0abd479764ef4e34f404c900aa7cdc1944875aec1d3d6189691ffd0b2d2075dd') //out of gas
        //
        // { blockHash: '0x3120ec8310c53ae053646ffdb06f6724f653a5d145b6c2cb89e90d80002a4857',
        //     blockNumber: 5855783,
        //     from: '0x4AEd9B8f6EF4F65e2A88a21d93591F5A558DDaAD',
        //     gas: 25200,
        //     gasPrice: '5800000000',
        //     hash: '0x0abd479764ef4e34f404c900aa7cdc1944875aec1d3d6189691ffd0b2d2075dd',
        //     input: '0x',
        //     nonce: 10,
        //     to: '0x1871E5063b3734C0235028bf8A0212CF0B8559Cc',
        //     transactionIndex: 211,
        //     value: '0',
        //     v: '0x25',
        //     r: '0xaf9f16af9cac9373e1bd2d307b30f8750c4ff91ed5e4a94f970decef739b2c40',
        //     s: '0x2ab7c70a34190ecc18e192b5153e1e37480445ec401d087a7ee9e6c6f18969cd' }



        getTx('0xe64a42b35637d0e790773a001ce7cd4d1ccaf90f868c2801f7329918e0e66444')
        //
        // { blockHash: '0x462f2ff6cc9e00860e744e325690b1b4f9685b88300294b7a62e4921a2a5b50f',
        //     blockNumber: 5856638,
        //     from: '0x7b6A077F34d6473c5AF32174621a69F5d1Fa323a',
        //     gas: 80000,
        //     gasPrice: '2100000000',
        //     hash: '0xe64a42b35637d0e790773a001ce7cd4d1ccaf90f868c2801f7329918e0e66444',
        //     input: '0x',
        //     nonce: 12,
        //     to: '0x1871E5063b3734C0235028bf8A0212CF0B8559Cc',
        //     transactionIndex: 131,
        //     value: '0',
        //     v: '0x26',
        //     r: '0xe059dadd23eafb0584bafb4a1098d75020638e89fb9f58dd6a57075dc8d8a894',
        //     s: '0x2937046f3c4b9b9dfc32bb9c38fad1c539ba29d978335f9c24dd83082ed19bc9' }

        //
        // { blockHash: '0x462f2ff6cc9e00860e744e325690b1b4f9685b88300294b7a62e4921a2a5b50f',
        //     blockNumber: 5856638,
        //     contractAddress: null,
        //     cumulativeGasUsed: 6520487,
        //     from: '0x7b6a077f34d6473c5af32174621a69f5d1fa323a',
        //     gasUsed: 71074,
        //     logs:
        //     [ { address: '0x1871E5063b3734C0235028bf8A0212CF0B8559Cc',
        //         topics: [Array],
        //         data: '0x00000000000000000000000000000000000000000000003635c9adc5dea00000',
        //         blockNumber: 5856638,
        //         transactionHash: '0xe64a42b35637d0e790773a001ce7cd4d1ccaf90f868c2801f7329918e0e66444',
        //         transactionIndex: 131,
        //         blockHash: '0x462f2ff6cc9e00860e744e325690b1b4f9685b88300294b7a62e4921a2a5b50f',
        //         logIndex: 94,
        //         removed: false,
        //         id: 'log_5ab6b762' },
        //         { address: '0x1871E5063b3734C0235028bf8A0212CF0B8559Cc',
        //             topics: [Array],
        //             data: '0x0000000000000000000000007b6a077f34d6473c5af32174621a69f5d1fa323a00000000000000000000000000000000000000000000003635c9adc5dea000000000000000000000000000000000000000000000000000000000000000000001',
        //             blockNumber: 5856638,
        //             transactionHash: '0xe64a42b35637d0e790773a001ce7cd4d1ccaf90f868c2801f7329918e0e66444',
        //             transactionIndex: 131,
        //             blockHash: '0x462f2ff6cc9e00860e744e325690b1b4f9685b88300294b7a62e4921a2a5b50f',
        //             logIndex: 95,
        //             removed: false,
        //             id: 'log_0b0a2877' } ],
        //         logsBloom: '0x00400000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000200000000010000000000000010000000000400000000008000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000040000000000000000000000000000000200000000000000000000000000800000000040000000000000',
        //     status: true,
        //     to: '0x1871e5063b3734c0235028bf8a0212cf0b8559cc',
        //     transactionHash: '0xe64a42b35637d0e790773a001ce7cd4d1ccaf90f868c2801f7329918e0e66444',
        //     transactionIndex: 131 }

        // getTx('0xb287259694427959a0179706b124208f70169cf132bb689e1f56c13e64b515e7')
        //
        // { blockHash: '0x1131029c47fd3ba5c96769d5dc702e44071b43ffdfeb179ddc035dd06b8499f5',
        //     blockNumber: 5856425,
        //     from: '0x13072002f8830E7360343fd861225aFE1Ec80a9a', //发送方
        //     gas: 60000,
        //     gasPrice: '8031250000',
        //     hash: '0xb287259694427959a0179706b124208f70169cf132bb689e1f56c13e64b515e7',
        //     input: '0xa9059cbb000000000000000000000000e88c90641efbde28e90fad122c2df75e4dc2da7f000000000000000000000000000000000000000000000035efb479876ae70000',//接收方 e88c90641efbde28e90fad122c2df75e4dc2da7f,token 数量 35efb479876ae70000
        //     nonce: 2139,
        //     to: '0x0c8bD5D1681aec511617d5385B23D7964931D635', //合约地址
        //     transactionIndex: 47,
        //     value: '0',
        //     v: '0x26',
        //     r: '0xbcfad8a58fd1c265a1be35043e12321f547ea0ef528a145ab681d4a7358fc463',
        //     s: '0x289e09c92e8459dc96be624c2fcbd123ec4f62d7f5efcbb4337859a939f1a2ab' }

        // getTx('0x4a902f19ea8f69d3a08f2d4e442a111dca4ea90987180ce642282c98c5ba03bf')
        //https://etherscan.io/tx/0x4a902f19ea8f69d3a08f2d4e442a111dca4ea90987180ce642282c98c5ba03bf
        //
        // { blockHash: '0x9cae6cbefb75048886c9381f442ab758151ad385ac108b07e63e740d82f1eced',
        //     blockNumber: 5826362,
        //     from: '0x882B147Db522DbAbfD56C2373a54543824bE7C13',
        //     gas: 21000,
        //     gasPrice: '1000000001',
        //     hash: '0x4a902f19ea8f69d3a08f2d4e442a111dca4ea90987180ce642282c98c5ba03bf',
        //     input: '0x',
        //     nonce: 8,
        //     to: '0x0064454B14cdDC990eD6520EF94d3E28fE7C41b6',
        //     transactionIndex: 238,
        //     value: '619000000000000',
        //     v: '0x25',
        //     r: '0xd7b742aa5fe89a68e28186b4b426e7fbde18f2a7ef62dc71f17582e09c4d308e',
        //     s: '0x66e2f590068b38c9254fd0c87986859175a105d280c96fe0a0ec35d382153f90' }


    });


// web3.eth.getBlockNumber()
//     .then((blockNumber)=>{
//         blockNum = blockNumber;
//         web3.eth.getBlock(blockNum)
//             .then(console.log);
//     });
//

//非监听模式
// web3.eth.getPastLogs({
// })
//     .then(console.log);

//http不支持的方法 ssh才支持
// var subscription = web3.eth.subscribe('logs', {
//
// }, function(error, result){
//     if (!error)
//         console.log(error);
//
//     error && console.log(error);
// })
//     .on("data", function(log){
//         console.log("data",log);
//     })
//     .on("changed", function(log){
//         console.log("changed",log);
//     });
//
//
// // unsubscribes the subscription
// subscription.unsubscribe(function(error, success){
//     if(success)
//         console.log('Successfully unsubscribed!');
// });



// var filter = web3.eth.filter('pending');
//
// filter.watch(function (error, log) {
//     console.log(log);
//     //  {"address":"0x0000000000000000000000000000000000000000", "data":"0x0000000000000000000000000000000000000000000000000000000000000000", ...}
// });

//web3 version 0.20 is web3.eth.filter, version 1.0 (in beta) is web3.eth.subscribe. You'll want to check your web3 version.

//As @frozeman said, subscribe will not work with an HTTP Provider, only websocket and IPC. Web3 1.0 uses pub/sub listening for logs/events, while web3 0.20 used polling.


//不支持
// web3.eth.personal.newAccount('!@superpassword')
//     .then(console.log);

// console.log(web3.eth.accounts.create());
// { address: '0x9813b9AFE444bff09909D8534d09c9301a562B91',
//     privateKey: '0x54f83e20f537ece992c7730a918f2d8a146797a8761310d93f7c2d4cce3dfdeb',
//     signTransaction: [Function: signTransaction],
//     sign: [Function: sign],
//     encrypt: [Function: encrypt] }


/* Below is a commented out alternative, which will return all the transaction info

web3.eth.getTransaction(ethTx, function(err, result) {
	if (!err) {
    		console.log(result); // All the transaction info
	}
	else {
		console.log('Error!', err); // Dump errors here
	}
});

*/
