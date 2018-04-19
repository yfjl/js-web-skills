#!/bin/bash
# Author:  bajian <313066164@qq.com>

#echo $#
if [  -z "$2" ]; then
  if [ $# -ne 1  ]; then
	echo "in empty"
	bitcoin-abc-cli  -datadir="/Users/gxh/Library/Application Support/Bitcoin/abc" -conf="/Users/gxh/Library/Application Support/Bitcoin/bitcoin_abc.conf" $1 ""
  else
	echo "in 222"
	bitcoin-abc-cli  -datadir="/Users/gxh/Library/Application Support/Bitcoin/abc" -conf="/Users/gxh/Library/Application Support/Bitcoin/bitcoin_abc.conf" $@
  fi

else
	echo "in 333"
	bitcoin-abc-cli  -datadir="/Users/gxh/Library/Application Support/Bitcoin/abc" -conf="/Users/gxh/Library/Application Support/Bitcoin/bitcoin_abc.conf" $@
#echo "args1 is empty,useage: ./create_git.sh repository_name"
    #可以在这里else，下面只是练手才有的
fi

#bitcoin-abc-cli  -datadir="/Users/gxh/Library/Application Support/Bitcoin/abc" -conf="/Users/gxh/Library/Application Support/Bitcoin/bitcoin_abc.conf" $1

