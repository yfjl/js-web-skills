/*
A script that returns some filtered events from an Ethereum smart contract.

Your contract will require a solidity event and it will need to be triggered at least once before you run the script.

For an explanation of this code, navigate to the wiki https://github.com/ThatOtherZach/Web3-by-Example/wiki/Getting-Smart-Contract-Events
*/
var url_private_geth='http://127.0.0.1:8555';

// Add the web3 node module
var Web3 = require('web3');

// Show web3 where it needs to look for the Ethereum node
web3 = new Web3(new Web3.providers.HttpProvider(url_private_geth));

// The address we want to search by.
var addr = "0x1a1394afe7778b134f9dc17e4904febfae29db5d";

// Show the Hash in the console.
console.log('Events by Address: ' + addr);


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
// Define the contract ABI and Address
var contract = new web3.eth.Contract(abi, '0xa8db29ea795decaf3d7ff3811781c6d81acb04ea');

// Fun console text, you can ignore this.
console.log('-----------------------------------');
console.log('Matching Smart Contract Events');
console.log('-----------------------------------');

// Search the contract events for the hash in the event logs and show matching events.
contract.getPastEvents('Event1', {
	filter: {_from: addr},
	fromBlock: 0,
	toBlock: 'latest'
	}, function(error, events){
		//console.log(events);
		for (i=0; i<events.length; i++) {
			var eventObj = events[i];
			console.log('Address: ' + eventObj.returnValues._from);
			console.log('Greeting: ' + web3.utils.hexToAscii(eventObj.returnValues._greeting));
		}
});
