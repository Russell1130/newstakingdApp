pragma solidity ^0.5.16;

contract staking {

    uint public stakeCount;
    string public test;
    mapping(address => uint) public stArray;
    mapping(uint => address) public userAddr;

    event StakeCreated(
        uint id,
        uint amount,
        address payable author
    );

    constructor() public {
        stakeCount = 0;
        test = "test string";
    }

    function createStake(uint _amount) public {
        require(_amount > 0);
        stakeCount++;
        stArray[msg.sender]=_amount;
        userAddr[stakeCount]=msg.sender;
        emit StakeCreated(stakeCount, _amount, msg.sender);
    }

    function getCount() public view returns (uint) {
        return stakeCount;
    }
}