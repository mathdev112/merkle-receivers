const mongoose = require("./db");
const Wallet = require("./Wallet");
const airdropList = require("./airdropList.json"); // File is to big and do not want to upload it to Git

(async () => {
  try {
    // Connect to the database
    await mongoose;

    // Delete all existing records in the Wallet collection
    await Wallet.deleteMany({});

    // Extract wallet data from airdropList.json
    const walletsData = Object.entries(airdropList.claims).map(([address, data]) => {
      return {
        address: address,
        index: data.index,
        amount: data.amount,
        proof: data.proof,
      };
    });

    // Insert new wallet records into the Wallet collection
    await Wallet.insertMany(walletsData);

    console.log("Data migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Data migration failed:", error);
    process.exit(1);
  }
})();
