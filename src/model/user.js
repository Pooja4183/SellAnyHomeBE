const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  img:  { type: String },
  email: { type: String, require: true  },
  password: {type: String, require: true},
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

 userSchema.method("transform", () => {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  //delete obj._id;

  return obj;
});

// Add a method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.model("User", userSchema);

module.exports = User;
