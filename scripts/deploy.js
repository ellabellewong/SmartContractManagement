// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // Initial value for the contract's count
    const initialCount = 0;

    // Get the contract factory
    const SimpleContract = await hre.ethers.getContractFactory("SimpleContract");

    // Deploy the contract with the initial count
    const simpleContract = await SimpleContract.deploy(initialCount);

    // Wait for the contract to be deployed
    await simpleContract.deployed();

    // Log the contract's deployment details
    console.log(
        `SimpleContract deployed with initial count of ${initialCount} to address: ${simpleContract.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
