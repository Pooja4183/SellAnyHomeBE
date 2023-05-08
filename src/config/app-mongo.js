const mongoose = require('mongoose');
const connect = () => {
  mongoose
    .connect(
      'mongodb+srv://sellanyhome55:arush555@sellanyhomecluster.cmadjgc.mongodb.net/?retryWrites=true&w=majority'

    )
    .then(() => {
      console.log('connected to database!');
    })
    .catch((err) => {
      console.log('connection failed!' , err);
    });
};

module.exports = { connect };
