// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 public count;

    // Set the initial value of count to 0
    constructor() {
        count = 0; // Initialize count to 0
    }

    // Increment
    function incrementCount() public {
        count++;
    }

    // Decrement 
    function decrementCount() public {
        require(count > 0, "Count cannot be negative");
        count--;
    }

    // Get the current count
    function getCount() public view returns (uint256) {
        return count;
    }
}
