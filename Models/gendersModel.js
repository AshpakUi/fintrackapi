const mongoose = require("mongoose");

const gendersModel = mongoose.model("genders", {
  genId: { type: String },
  genName: { type: String },
  isActive: { type: Boolean },
});

module.exports = gendersModel;
