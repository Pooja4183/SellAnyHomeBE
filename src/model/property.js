const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
  id: { type: String, require: true },
  homeType: { type: String, require: true },
  isBuy: { type: Boolean },
  bed: { type: Number },
  bath: { type: Number },
  price: { type: Number },
  currency: { type: String },
  sqFt: { type: Number },
  address: { type: String ,  text: true },
  city: { type: String },
  state: { type: String },
  description: { type: String,  },
  img1: { type: String },
  img2: { type: String },
});

// Define a text index on the name and description fields
propertySchema.index({
  homeType: "text",
  description: "text",
  city: "text",
  address: "text",
  state: "text",
});

propertySchema.method("transform", () => {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model("propertydbs", propertySchema);
