/*
A script that gets the transaction info from a transaction hash/ID, then shows the result in the console.

For an explanation of this code, navigate to the wiki https://github.com/ThatOtherZach/Web3-by-Example/wiki/Get-Transaction
*/

// Get the web3 Module
var Web3 = require('web3');

// Show web3 where it needs to look for the Ethereum node.
web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Define a normal transaction hash to use
var ethTx = ('0x5b5a7a6aa51eb534d440438a16e7db5d2b6eaeb4ca01af20a39a82f4e35401b4');

// Use web3 getTransaction to get the json transaction object, then we log only the values we want
web3.eth.getTransaction(ethTx, function(err, result) { 
	if (!err) {
		console.log('result: ' ,result); // Log the from address
		console.log('From Address: ' + result.from); // Log the from address
		console.log('To Address: ' + result.to); // Log the to address
		console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether'))); // Get the value, convert from Wei to Ether and log it
	}
	else {
		console.log('Error!', err); // Dump errors here
	}
});


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
