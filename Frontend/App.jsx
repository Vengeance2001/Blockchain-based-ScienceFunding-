
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import FormComponent from "./components/FormComponent";
import Homepage from "./components/Homepage";
import { ethers } from 'ethers'
import abi from './abi.json'
import { useEffect, useState } from "react";
import ProofPage from "./components/ProofPage";



function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [account, setAccount] = useState('Not Connected!');

  useEffect(() => {
    const template = async () => {
      const contractAddress = "your account address";
      const contractAbi = abi.abi;

      const { ethereum } = window;
      if (ethereum) {
        const account = await ethereum.request({ method: "eth_requestAccounts" });
        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        setState({
          provider,
          signer,
          contract,
        });
        console.log(contract);
      } else {
        console.error("Ethereum not found. Please make sure you are connected to a web3 provider.");
      }
    };

    template();
  }, []);


  return (
    <div>
      <Router>
        <Navbar/>
        
        <Routes>
        <Route path="/formcomponent" element={<FormComponent state={state}/> } />
        <Route path="/" element={<Homepage state={state}/> } />
        <Route path="/proofpage" element={<ProofPage/> } />

        </Routes>
      </Router>
      
    </div>
  )
}

export default App
