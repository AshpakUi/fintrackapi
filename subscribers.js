const express = require("express");
const cors = require("cors");
const app = express();
const ConnectDB = require("./db");
const subscribersModel = require("./Models/subscribersModel");
const categoriesModel = require("./Models/categoriesModel");
const gendersModel = require("./Models/gendersModel");

app.use(express.json());
app.use(cors());

app.post("/deposite", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get("/", (req, res) => {
  res.send("Welcome to GOPDAC....");
});

app.get("/categories", async (req, res) => {
  ConnectDB("fintrackdb");
  const result = await categoriesModel.find({});
  res.send(result);
});

app.get("/genders", async (req, res) => {
  ConnectDB("fintrackdb");
  const result = await gendersModel.find({});
  res.send(result);
});

app.post("/addgender", (req, res) => {
  ConnectDB("fintrackdb");
  const newGender = new gendersModel(req.body);
  newGender.save();
  res.send("New Gender has been added!!!");
});

app.post("/addcategory", (req, res) => {
  ConnectDB("fintrackdb");
  const newCategory = new categoriesModel(req.body);
  newCategory.save();
  res.send("New Catogory has been added!!!");
});

app.get("/subscribers", async (req, res) => {
  ConnectDB("fintrackdb");
  const result = await subscribersModel.find({});
  res.send(result);
});
app.post("/addsubscriber", (req, res) => {
  ConnectDB("fintrackdb");
  const newSubsciber = new subscribersModel(req.body);
  newSubsciber.save();
  res.send("New Suscrider added successfully!");
});

app.post("/subscribersbycity", async (req, res) => {
  ConnectDB("fintrackdb");
  const result = await subscribersModel.find(req.body);
  res.send(result);
});

app.post("/subsbycity", (req, res) => {
  const data = req.body;
  res.json(data.city);
});

app.get("/fullname", (req, res) => {
  res.send("This is my full name");
});
app.post("/fullname", (req, res) => {
  const data = req.body;
  res.json(data.fname + " " + data.mname + " " + data.lname);
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
