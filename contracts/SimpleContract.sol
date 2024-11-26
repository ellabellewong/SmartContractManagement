// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SimpleContract {
    address public owner;
    uint256 public count;

    event CountIncremented(uint256 newCount);
    event CountReset(uint256 previousCount);

    constructor(uint256 initialCount) {
        owner = msg.sender;
        count = initialCount;
    }

    // Function to get the current count
    function getCount() public view returns (uint256) {
        return count;
    }

    // Function to increment the count
    function incrementCount() public {
        count += 1;
        emit CountIncremented(count);
    }

    // Function to reset the count (only the owner can reset)
    function resetCount() public {
        require(msg.sender == owner, "Only the owner can reset the count");
        uint256 previousCount = count;
        count = 0;
        emit CountReset(previousCount);
    }
}
