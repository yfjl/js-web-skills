#!/bin/bash
# Author:  bajian <313066164@qq.com>


#geth --identity "secbro etherum" --rpc --rpccorsdomain "*" --datadir "/home/zhuzs/eth/chain" --port "30303" --rpcapi "db,eth,net,web3" -- networkid 95518 console --dev
#geth --identity "linoy" --rpc --rpccorsdomain "*" --datadir "./" --port "30303" --nodiscover --rpcapi "personal,db,eth,net,web3,miner" --networkid 1999 console 2>>geth.log

geth  --identity "bajian_eth"   --syncmode "fast"   --rpc --rpcport "8777"  --rpccorsdomain "*"  --port "30304" --rpcapi "personal,miner,db,eth,net,web3"    console 2>>geth.log


