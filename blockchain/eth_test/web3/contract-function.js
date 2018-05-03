/*
A script that gets runs a function call in a smart contract on Ethereum. This script will probably not work on payable or not constant solidity functions. Use at your own risk. 

Currently this script is set up to call the "Ebola on Ethereum" smart contract. For more info on that see the repo here: https://github.com/ThatOtherZach/Ebola-on-Ethereum

For an explanation of this code, navigate to the wiki https://github.com/ThatOtherZach/Web3-by-Example/wiki/contract-function
*/
var url_private_geth='http://127.0.0.1:8555';

// Add the web3 node module
var Web3 = require('web3');

// Show web3 where it needs to look for the Ethereum node
web3 = new Web3(new Web3.providers.HttpProvider(url_private_geth));

// Write to the console the script will run shortly
console.log('Contract-ing Ebola.....');

// Define the ABI of the contract, used to return the desired values
var abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    }
];
// The Ethereum address of the smart contract
var addr = "0xa8db29ea795decaf3d7ff3811781c6d81acb04ea";

// Build a new variable based on the web3 API including the ABI and address of the contract
var EbolaContract = new web3.eth.Contract(abi, addr);

// Put it all together in a call and return the result to the console
// FUNCTION can be "getEbola", "getInfo", "tipCreator" and "kill"
EbolaContract.methods.totalSupply().call().then(console.log);//888888800000000
// EbolaContract.methods.symbol().call().then(console.log);//888888800000000
// EbolaContract.methods.totalSupply().call().then(console.log);//888888800000000
console.log(EbolaContract.methods)

// { approve: [Function: bound _createTxObject],
//     '0x095ea7b3': [Function: bound _createTxObject],
//     'approve(address,uint256)': [Function: bound _createTxObject],
//     totalSupply: [Function: bound _createTxObject],
//     '0x18160ddd': [Function: bound _createTxObject],
//     'totalSupply()': [Function: bound _createTxObject],
//     transferFrom: [Function: bound _createTxObject],
//     '0x23b872dd': [Function: bound _createTxObject],
//     'transferFrom(address,address,uint256)': [Function: bound _createTxObject],
//     balanceOf: [Function: bound _createTxObject],
//     '0x70a08231': [Function: bound _createTxObject],
//     'balanceOf(address)': [Function: bound _createTxObject],
//     transfer: [Function: bound _createTxObject],
//     '0xa9059cbb': [Function: bound _createTxObject],
//     'transfer(address,uint256)': [Function: bound _createTxObject],
//     allowance: [Function: bound _createTxObject],
//     '0xdd62ed3e': [Function: bound _createTxObject],
//     'allowance(address,address)': [Function: bound _createTxObject] }

