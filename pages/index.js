import { useState, useEffect } from "react";
import { ethers } from "ethers";
import simpleContractAbi from "../artifacts/contracts/SimpleContract.sol/SimpleContract.json";

export default function SimpleContractApp() {
    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [simpleContract, setSimpleContract] = useState(undefined);
    const [count, setCount] = useState(undefined);
    const [tokenBalance, setTokenBalance] = useState(undefined);
    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState("");

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = simpleContractAbi.abi;

    // Check if MetaMask is installed
    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
        } else {
            alert("Please install MetaMask!");
        }
    };

    // Handle account connection
    const handleAccount = (accounts) => {
        if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
        } else {
            console.log("No account found");
        }
    };

    // Connect to MetaMask account
    const connectAccount = async () => {
        if (!ethWallet) {
            alert("MetaMask wallet is required to connect");
            return;
        }

        const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
        handleAccount(accounts);
        getSimpleContract();
    };

    // Setup contract instance
    const getSimpleContract = () => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setSimpleContract(contract);
    };

    // Fetch contract data
    const getContractData = async () => {
        if (simpleContract) {
            const currentCount = await simpleContract.getCount();
            const currentTokens = await simpleContract.tokenBalance();
            const currentMessage = await simpleContract.message();

            setCount(currentCount.toNumber());
            setTokenBalance(currentTokens.toNumber());
            setMessage(currentMessage);
        }
    };

    // Increment count
    const incrementCount = async () => {
        if (simpleContract) {
            const tx = await simpleContract.incrementCount();
            await tx.wait();
            getContractData();
        }
    };

    // Decrement count
    const decrementCount = async () => {
        if (simpleContract) {
            try {
                const tx = await simpleContract.decrementCount();
                await tx.wait();
                getContractData();
            } catch (error) {
                console.error("Error in decrementing count:", error);
            }
        }
    };

    // Update message
    const updateMessage = async () => {
        if (simpleContract) {
            try {
                const tx = await simpleContract.setMessage(newMessage);
                await tx.wait();
                getContractData();
                setNewMessage("");
            } catch (error) {
                console.error("Error in updating message:", error);
            }
        }
    };

    // Render based on connection status
    const initUser = () => {
        if (!ethWallet) {
            return <p>Please install MetaMask to use this app.</p>;
        }

        if (!account) {
            return <button onClick={connectAccount}>Connect MetaMask Wallet</button>;
        }

        if (count === undefined) {
            getContractData();
        }

        return (
            <div>
                <p>Your Account: {account}</p>
                <p>Current Count: {count}</p>
                <p>Token Balance: {tokenBalance}</p>
                <p>Message: {message}</p>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter new message"
                />
                <button onClick={updateMessage}>Set Message</button>
                <button onClick={incrementCount}>Increment Count</button>
                <button onClick={decrementCount}>Decrement Count</button>
            </div>
        );
    };

    useEffect(() => {
        getWallet();
    }, []);

    return (
        <main className="container">
            <header>
                <h1>Simple Contract Management</h1>
            </header>
            {initUser()}
            <style jsx>
                {`
                    .container {
                        text-align: center;
                        margin-top: 20px;
                    }
                `}
            </style>
        </main>
    );
}
