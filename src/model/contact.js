const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  id: { type: String, require: true },

  buyerName: { type: String, require: true  },
  buyerEmail: { type: String, require: true  },
  buyerPhone: { type: String, require: true  },
  moreInfo: {type: String},
  propertyId: {type: String, require: true },
  status: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now }
});

// Define a text index on the name and description fields
// contactSchema.index({
//   //homeType: "text",
//   //description: "text",
//   city: "text",
//   //address: "text",
//   //state: "text",
// });

contactSchema.method("transform", () => {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  //delete obj._id;

  return obj;
});

const contactDB = mongoose.model("contactdbs", contactSchema);

module.exports = contactDB;
