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
      backgroundImage: `url('https://raw.githubusercontent.com/nickamaes/Maes/main/dapp/app/BGpage.jpg')`,
      minHeight: '100vh',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      
    }}>

      <div style={{minHeight: '30vh' }}> 
        <button onClick={() => {connectWallet();}}
        className="p-3 bg-slate-800 text-white rounded"
        style={{ 
          background: 'linear-gradient(to top, black, gray)',
          border: 'none'
        }}>
        {walletKey != "" ? walletKey : " Connect wallet"}
        
        </button>
      </div>
      <div style={{textAlign: 'center' }}>
      <p style={{fontSize: '30px'}}><b>Maes Token</b></p>
     
      <p>Minting and Staking</p>
        
      </div>
      <div style={{
          border: '4px dashed rgba(204, 204, 204, 0.5)', 
          padding: '20px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '300px', 
          margin: '0 auto' 
        }}>
        <br></br>
        <form style={{marginBottom: '10px'}}>
          <label> <b>Input Amount To Mint Mae:</b></label><br></br>
       
        </form>
        <input
          type="number"
          value={mintingAmount}
          onChange={(e) => mintAmountChange(e)}
          style={{ color: "black", marginBottom: '10px' }}
        />
        <button
          onClick={() => { mintCoin(); }}
          className="p-3 bg-slate-800 text-white rounded"
          style={{ 
            background: 'linear-gradient(to right, black, gray)',
            border: 'none'
          }}
        >
          {"Mint Token"}
        </button>
      </div>

    <br></br>

    <div style={{ 
          border: '4px dashed rgba(204, 204, 204, 0.5)', 
          padding: '20px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '300px', 
          margin: '0 auto' 
          }}>
    <form style={{marginBottom: '10px'}}>
        <label> <b>Input Amount To Stake</b></label><br></br>
        </form>
      <input
        type="number"
        value = {stakingAmount}
        onChange = {(e) => stakeAmountChange(e)}
        style={{color:"Black",marginBottom: '10px' }}
      />
    
      <button 
        onClick={stakeCoin}
        className="p-3 bg-slate-800 text-white rounded"
        style={{ 
          background: 'linear-gradient(to left, black, gray)',
          border: 'none'
        }}
      >
        {"Stake Maes"}
      </button> 
    </div>



  <div style = {{textAlign: 'center', margin: '0 auto'}}>
    <br></br>
    <br></br>
    <button 
        onClick={withdrawCoin}
        className="p-3 bg-slate-800 text-white rounded"
        style={{ 
          background: 'linear-gradient(to top, black, gray)',
          border: 'none'
        }}
      >
        {"Withdraw"}
      </button> 

      </div>

    </main>
  );
}