import React, { useState } from "react";
import Web3 from "web3";
import Identicon from "identicon.js";
import "./App.css";
import Datreon from "../abis/Datreon.json";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar";
import Main from "./Main";

export default function App() {
  const [account, setAccount] = useState("fgfgfgfgfgffhfr");
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <Navbar account={account} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Main
        // Code...
        />
      )}
    </div>
  );
}
