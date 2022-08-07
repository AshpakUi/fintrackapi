const mongoose = require("mongoose");

const ConnectDB = (dbname) => {
  const db = `mongodb://localhost/${dbname}`;
  mongoose
    .connect(db)
    .then(() => console.log(`Connected to ${db}`))
    .catch((err) => console.log(err));
};

module.exports = ConnectDB;
