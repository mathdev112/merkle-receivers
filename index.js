const express = require("express");
const dotenv = require("dotenv");
const Wallet = require("./Wallet");
const cors = require("cors");
const fs = require('fs');
const db = require("./db");

dotenv.config();

const app = express();

// Read the private key and SSL certificate files into memory
const privateKey = fs.readFileSync('/etc/ssl/private/server.key');
const certificate = fs.readFileSync('/etc/ssl/certs/server.crt');

// Create an HTTPS server
const server = https.createServer({
  key: privateKey,
  cert: certificate
}, app);

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const isValidEthereumAddress = (address) => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};

app.get("/wallet/:account", async (req, res) => {
  try {
    const { account } = req.params;

    if (!account || !isValidEthereumAddress(account)) {
      return res.status(400).json({ error: "Invalid account address" });
    }

    const wallet = await Wallet.findOne({ address: account }, { _id: 0, index: 1, address: 1, amount: 1, proof: 1 });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.json(wallet);
  } catch (error) {
    console.error("Error while processing /wallet/:account request:", error);
    console.log(await Wallet.findOne({ address: req.params.account }).explain());
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
server.listen(443, () => {
  console.log('HTTPS server running on port 443');
});
