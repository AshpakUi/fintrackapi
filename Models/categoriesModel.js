const mongoose = require("mongoose");

const categoriesModel = mongoose.model("categories", {
  catId: { type: String },
  catName: { type: String },
  isActive: { type: Boolean },
});

module.exports = categoriesModel;
