const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then((res) => {
    console.log("Connection Sucessfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68029884884d5b6eb2c16e9f",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
