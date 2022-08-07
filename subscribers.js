const express = require("express");
const cors = require("cors");
const app = express();
const ConnectDB = require("./db");
const subscribersModel = require("./Models/subscribersModel");

app.use(express.json());
app.use(cors());

app.post("/deposite", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get("/", (req, res) => {
  res.send("Welcome to GOPDAC....");
});

app.get("/subscribers", async (req, res) => {
  ConnectDB("fintrackdb");
  const result = await subscribersModel.find({});
  res.send(result);
});

app.get("/addbank", (req, res) => {
  ConnectDB();
  const bank = {
    name: "Axis",
    branch: "Chinchwad",
    city: "Pune",
  };
  const newBank = new bankModel(bank);
  newBank.save();
});
app.post("/api/getBenef", async (req, res) => {
  ConnectDB();
  const result = await benefModel.find(req.body);
  res.send(result);
});

app.post("/api/addbenef", (req, res) => {
  ConnectDB();
  const newBenef = new benefModel(req.body);
  newBenef.save();
  res.send("New beneficiary added successfully!");
});

app.post("/api/updatebenef", async (req, res) => {
  ConnectDB();
  const currbenef = await benefModel.findOne({ accno: req.body.accno });
  const newbenef = {
    accno: currbenef.accno,
    bankname: currbenef.bankname,
    branchname: currbenef.branchname,
    amnt: currbenef.amnt + Number(req.body.amnt),
    bname: currbenef.bname,
    isActive: currbenef.isActive,
  };
  currbenef.overwrite(newbenef);
  currbenef.save();
  res.send(
    "Your amount " +
      req.body.amnt +
      " has been added successfully. Balance Amount:" +
      currbenef.amnt
  );
});

app.post("/api/debitbenef", async (req, res) => {
  ConnectDB();
  const currbenef = await benefModel.findOne({ accno: req.body.accno });
  const newbenef = {
    accno: currbenef.accno,
    bankname: currbenef.bankname,
    branchname: currbenef.branchname,
    amnt: currbenef.amnt - Number(req.body.amnt),
    bname: currbenef.bname,
    isActive: currbenef.isActive,
  };
  currbenef.overwrite(newbenef);
  currbenef.save();
  res.send(
    "Your amount " +
      req.body.amnt +
      " has been debited successfully. Balance Amount:" +
      currbenef.amnt
  );
});

app.post("/api/addbank", (req, res) => {
  ConnectDB();
  const newBank = new bankModel(req.body);
  newBank.save();
  res.send("New bank added successfully!!");
});

app.post("/api/getbank", async (req, res) => {
  ConnectDB();
  const result = await bankModel.find(req.body);
  res.send(result);
});

app.listen(3030, () => {
  console.log(`Connected to server : 3030`);
});
