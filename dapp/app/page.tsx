"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";
import { url } from "inspector";


export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>

  //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>


  return (
    <main style={{
      justifyContent: 'center',
      fontFamily: "Verdana, sans-serif",
      minHeight: '100vh',
      backgroundPosition: 'center',}}>

      <div style={{minHeight: '30vh' }}> 
        <button onClick={() => {connectWallet();}}
        className="p-3 bg-slate-800 text-white rounded">
        {walletKey != "" ? walletKey : " Connect wallet"}
        </button>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <br></br>
      <form>
        <label> Input Amount To Mint</label><br></br>
        </form>
      <input
        type="number"
        value = {mintingAmount}
        onChange = {(e) => mintAmountChange(e)}
        style={{color:"Black"}}
      />
      <button 
        onClick={() => {mintCoin();}}
        className="p-3 bg-slate-800 text-white rounded"
      >
        {"Mint Token"}
      </button> 
      
    </div>
    <br></br>

    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>
    <form>
        <label> Input Amount To Stake</label><br></br>
        </form>
      <input
        type="number"
        value = {stakingAmount}
        onChange = {(e) => stakeAmountChange(e)}
        style={{color:"Black"}}
      />
    
      <button 
        onClick={stakeCoin}
        className="p-3 bg-slate-800 text-white rounded"
      >
        {"Stake It"}
      </button> 
    </div>

  <div>
    <br></br>
    <br></br>
    <button 
        onClick={withdrawCoin}
        className="p-3 bg-slate-800 text-white rounded"
      >
        {"Withdraw"}
      </button> 
      </div>

    </main>
  );
}