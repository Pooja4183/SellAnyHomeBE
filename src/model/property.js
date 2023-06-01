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
  images: [{ type: String }],
  img1: { type: String },
  img2: { type: String },
  yearBuilt: { type: Number },
  contactName: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  sellerType: { type: String },
  isListed:{ type: String },
  sellDuration: { type: String },
  status: { type: String }
});

// Define a text index on the name and description fields
propertySchema.index({
  //homeType: "text",
  //description: "text",
  city: "text",
  //address: "text",
  //state: "text",
});

propertySchema.method("transform", () => {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

const propertyDB = mongoose.model("propertydbs", propertySchema);

async function  totalRecords() {
  let total = 0;
 await propertyDB.countDocuments()
    .then((count) => {
      total = count;
      console.log("Count::", total);
    })
    .catch((error) => {
      console.error(error);
      // Handle the error
    });
    console.log("Records", total);
  return total;
}



module.exports = {propertyDB, totalRecords};
