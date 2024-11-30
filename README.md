# Simple Contract Management by Ella Wong

This project is a decentralized application (DApp) built using **React** and **Solidity**. It demonstrates interaction with a smart contract deployed on Ethereum, enabling users to:
- View and modify a stored message.
- Increment and decrement a counter.
- Track a token balance awarded every two increments.

---

## Features
1. **Smart Contract (Solidity)**:
   - **Count Management**: A counter that can be incremented or decremented.
   - **Token Rewards**: Tokens are rewarded every two increments of the counter.
   - **Message Storage**: A message that can be updated dynamically by users.
   - **Owner Identification**: The contract tracks its deployer as the owner.

2. **Frontend**:
   - Connects to the Ethereum blockchain using **MetaMask**.
   - Displays current count, token balance, and message stored in the smart contract.
   - Allows users to update the message and modify the counter.

---

### `SimpleContract.sol`
The contract is written in **Solidity** and contains:
- **State Variables**:
  - `count`: Tracks the counter value.
  - `tokenBalance`: Tracks the token rewards.
  - `owner`: Stores the address of the contract's deployer.
  - `message`: A user-defined string.
- **Functions**:
  - `incrementCount()`: Increments the counter and awards a token every two increments.
  - `decrementCount()`: Decrements the counter but ensures it doesn't go negative.
  - `setMessage(string memory newMessage)`: Updates the stored message.
  - Getters for `count`, `message`, and `owner`.
- **Event**:
  - `MessageChanged`: Emits an event when the message is updated.

---

## Frontend Application
### `index.js`
- **State Management**:
  - `ethWallet`: Stores the MetaMask instance.
  - `account`: Stores the connected Ethereum address.
  - `simpleContract`: Holds the contract instance.
  - `count`, `tokenBalance`, `message`, `newMessage`: Track contract data.
- **Functions**:
  - `getWallet()`: Checks for MetaMask availability.
  - `connectAccount()`: Connects to a MetaMask account.
  - `getSimpleContract()`: Initializes the smart contract instance.
  - `getContractData()`: Fetches the current contract state.
  - `incrementCount()` and `decrementCount()`: Interact with the counter functions.
  - `updateMessage()`: Updates the message stored in the contract.

---
## Ella Belle G. Wong
