pragma solidity ^0.4.16;
/**
* 测试钱包 0x1a1394aFE7778b134F9Dc17E4904febFAe29dB5d
* 测试合约 0x1628b803e895ea08feed78e1da1151e848819f51
*流程：
1、通过标准合约（EIP） 生成需要的代币，
2、调用此合约生成众筹收发币工具（记录下工具合约地址）
3、往工具合约地址转入生成合约时候的代币种类对应数量，用于发币
4、以后可以改价格和代币合约地址
*/
interface token {
    function transfer(address receiver, uint amount);
}

contract Crowdsale {
    address public beneficiary;  // 募资成功后的收款方
    uint public price;    //  token 与以太坊的汇率 , token卖多少钱
    token public tokenReward;   // 要卖的token


    /**
     * 合约地址 0x9d8d8bcd937e4bcfd1d4142ea117330f5be4260b
     * 构造函数, 设置相关属性 "1","0x9d8d8bcd937e4bcfd1d4142ea117330f5be4260b"
     *  tokenPerETH 代币18个小数点的情况下，1ETH=多少代币，上面例子就是转一个以太坊送一个token
     *  addressOfTokenUsedAsReward 发币代币的合约地址
     */
    function Crowdsale(
        uint tokenPerETH,
        address addressOfTokenUsedAsReward) {
            beneficiary = msg.sender;
            price = tokenPerETH;
            tokenReward = token(addressOfTokenUsedAsReward);   // 传入已发布的 token 合约的地址来创建实例
    }

    /**
     * 无函数名的Fallback函数，
     * 在向合约转账时，这个函数会被调用
     */
    function () payable {
            tokenReward.transfer(msg.sender, msg.value * price);
    }

    /**
     * 完成融资目标时，融资款发送到收款方
     * 未完成融资目标时，执行退款
     * 18个零，比如提0.151ETH--->0.151*1000000000000000000
     */
    function safeWithdrawal(uint _withdrawaleth) {
        if (beneficiary == msg.sender) {
            beneficiary.send(_withdrawaleth);
        }
    }
    
    /**
     * 提取合约账户内任意代币
     */
    function safeTokenWithdraw(uint _withdrawaleth,address t) {
        if (beneficiary == msg.sender) {
            token tt =  token(t);
            tt.transfer(beneficiary, _withdrawaleth);
        }
    }
    
    function setPriceAndToken(address t,uint new_price) {
        if (beneficiary == msg.sender) {
            price = new_price;
            tokenReward =  token(t);
        }
    }
    
}