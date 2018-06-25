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
};
// web3.eth.getBlockNumber()
//     .then((blockNumber)=>{
//         blockNum = blockNumber;
//
//         getTx('0x4a902f19ea8f69d3a08f2d4e442a111dca4ea90987180ce642282c98c5ba03bf')
//     });


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
