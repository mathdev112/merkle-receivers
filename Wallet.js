const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  index: String,
  address: {
    type: String,
    required: true,
    index: true, // Add this line to create an index on the 'address' field
  },
  amount: String,
  proof: [String],
});

module.exports = mongoose.model("Wallet", WalletSchema);
