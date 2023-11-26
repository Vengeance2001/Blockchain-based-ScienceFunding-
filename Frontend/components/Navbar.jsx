import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

function Navbar() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if MetaMask is installed and connected
    async function checkMetaMask() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await provider.listAccounts();

          if (accounts.length > 0) {
            setIsConnected(true);
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      }
    }

    checkMetaMask();
  }, []);

  const disconnectMetaMask = () => {
    if (window.ethereum) {
      window.ethereum.selectedAddress = null;
      setIsConnected(false);
    }
  };

  return (
    <nav className="bg-gray-800 py-3 px-4 lg:flex lg:justify-between lg:items-center">
      <div className="text-lg font-semibold text-blue-500">
        <Link to="/" className="text-green-500 hover:text-green-700">
          Sci<span className="text-green-500">Funding</span>
        </Link>
      </div>
      <div className="flex space-x-4 items-center lg:space-x-4">
        <Link to="/" className="text-white hover:text-blue-300">
          Home
        </Link>
        <Link to="/proofpage" className="text-white hover:text-blue-300">
          Proofs
        </Link>
        {isConnected ? (
          <div className="text-white">
            Connected: {account}
            <button
              className="bg-red-500 text-white px-2 py-1 ml-2 hover:bg-red-700"
              onClick={disconnectMetaMask}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 hover:bg-green-700"
            onClick={() => {
              window.ethereum.request({ method: "eth_requestAccounts" });
              setIsConnected(true);
            }}
          >
            Connect
          </button>
        )}
        <Link to="/formcomponent" className="text-white hover:text-blue-300">
          <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-700">
            Create Campaign
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
