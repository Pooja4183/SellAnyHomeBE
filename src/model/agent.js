const mongoose = require("mongoose");

const agentSchema = mongoose.Schema({
  img:  { type: String },
  name: { type: String, require: true  },
  email: { type: String, require: true  },
  phone: { type: String, require: true  },
  salesVolume:{ type: String },
  status: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now }
},
{
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
     // delete ret._id;
      delete ret.__v;
    }
  }, toObject: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      //delete ret._id;
      delete ret.__v;
    }
  }
 } );

agentSchema.method("transform", () => {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  //delete obj._id;

  return obj;
});

const agentDB = mongoose.model("agentdbs", agentSchema);

module.exports = agentDB;
