import { useState, useEffect } from "react";
import { ethers } from "ethers";
import simpleContractAbi from "../artifacts/contracts/SimpleContract.sol/SimpleContract.json";

export default function SimpleContractApp() {
    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [simpleContract, setSimpleContract] = useState(undefined);
    const [count, setCount] = useState(undefined);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //contract address needs to be correct
    const contractABI = simpleContractAbi.abi;

    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
        }

        if (ethWallet) {
            const accounts = await ethWallet.request({ method: "eth_accounts" });
            handleAccount(accounts);
        }
    };

    const handleAccount = (accounts) => {
        if (accounts && accounts.length > 0) {
            console.log("Account connected:", accounts[0]);
            setAccount(accounts[0]);
        } else {
            console.log("No account found");
        }
    };

    const connectAccount = async () => {
        if (!ethWallet) {
            alert("MetaMask wallet is required to connect");
            return;
        }

        const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
        handleAccount(accounts);
        getSimpleContract();
    };

    const getSimpleContract = () => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setSimpleContract(contract);
    };

    const getCount = async () => {
        if (simpleContract) {
            const currentCount = await simpleContract.getCount();
            setCount(currentCount.toNumber());
        }
    };

    const incrementCount = async () => {
        if (simpleContract) {
            const tx = await simpleContract.incrementCount();
            await tx.wait();
            getCount();
        }
    };

    const decrementCount = async () => {
        if (simpleContract) {
            try {
                const tx = await simpleContract.decrementCount();
                await tx.wait();
                getCount();
            } catch (error) {
                console.error("Error in decrementing count:", error);
            }
        }
    };

    const initUser = () => {
        if (!ethWallet) {
            return <p>Please install MetaMask to use this app.</p>;
        }

        if (!account) {
            return <button onClick={connectAccount}>Connect MetaMask Wallet</button>;
        }

        if (count === undefined) {
            getCount();
        }

        return (
            <div>
                <p>Your Account: {account}</p>
                <p>Current Count: {count}</p>
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
                <h1>Smart Contract Management</h1>
                <h2>Ella Belle G. Wong</h2>
            </header>
            {initUser()}
            <style jsx>{`
        .container {
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
        </main>
    );
}
