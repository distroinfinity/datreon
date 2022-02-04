import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Identicon from "identicon.js";
import "./App.css";
import Datreon from "../abis/Datreon.json";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar";
import Main from "./Main";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

export default function App() {
  const [account, setAccount] = useState("fgfgfgfgfgffhfr");
  const [datreon, setDatreon] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageCount, setImageCount] = useState(0);
  const [buffer, setBuffer] = useState();

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  useEffect(() => {
    console.log("buffer", buffer);
  }, [buffer]);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    // update state to this value
    setAccount(accounts[0]);
    // Network ID
    const networkId = await web3.eth.net.getId();
    console.log("network id", networkId);
    const networkData = Datreon.networks[networkId];

    if (networkData) {
      console.log(networkData);
      const datreon = web3.eth.Contract(Datreon.abi, networkData.address);
      // console.log(_datreon)
      // set contract to datreon
      setDatreon(datreon);
      const imagesCount = await datreon.methods.imageCount().call();
      console.log("Count", imagesCount);
      setImageCount(imageCount);

      // Load images
      const temp = [];
      for (var i = 1; i <= imagesCount; i++) {
        const image = await datreon.methods.images(i).call();
        // console.log(i, image);
        temp.push(image);
      }
      // Sort images. Show highest tipped images first
      temp.sort((a, b) => b.tipAmount - a.tipAmount);

      setImages(temp);
      setLoading(false);
    } else {
      //Alert
      window.alert("Datreon contract not deployed to detected network.");
    }
  }

  function captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  }

  function uploadImage(description) {
    console.log("Submitting file to ipfs...");

    //adding file to the IPFS
    ipfs.add(buffer, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }

      setLoading(true);
      datreon.methods
        .uploadImage(result[0].hash, description)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          setLoading(false);
        });
    });
  }

  function tipImageOwner(id, tipAmount) {
    // this.setState({ loading: true });
    datreon.methods
      .tipImageOwner(id)
      .send({ from: account, value: tipAmount })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  }

  return (
    <div style={{ display: "flex" }}>
      <Navbar account={account} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Main
          captureFile={captureFile}
          uploadImage={uploadImage}
          images={images}
          tipImageOwner={tipImageOwner}
        />
      )}
    </div>
  );
}
