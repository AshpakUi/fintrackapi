const mongoose = require("mongoose");

const subscribersModel = mongoose.model("subscribers", {
  subsid: { type: String },
  fname: { type: String },
  lname: { type: String },
  city: { type: String },
});

module.exports = subscribersModel;
