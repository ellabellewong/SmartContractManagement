// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 public count;
    uint256 public tokenBalance;
    address public owner;
    string public message;

    event MessageChanged(string newMessage);

    constructor() {
        count = 0;
        tokenBalance = 0;
        owner = payable(msg.sender); // Initialize the owner to the deployer's address
    }

    function incrementCount() public {
        count++;
        if (count % 2 == 0) {
            tokenBalance++; // Award one token every two increments
        }
    }

    function decrementCount() public {
        require(count > 0, "Count cannot be negative");
        count--;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
        emit MessageChanged(newMessage);
    }
}
