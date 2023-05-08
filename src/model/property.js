const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  id: { type: String, require: true },
  homeType : {type: String, require: true},
  isBuy : {type : Boolean, require: true},
  bed : {type: Number, require: true},
  bath : {type: Number, require: true},
  price: { type: Number, require: true },
  currency : {type: String, require: true},
  sqFt: { type: Number, require: true },
  address : {type: String, require: true},
  city : {type: String, require: true},
  state : {type: String, require: true},
  description : {type: String, require: true},
  img1: { type: String},
  img2: { type: String },
  
});


propertySchema.method('transform', () => {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model('propertyDB', propertySchema);
