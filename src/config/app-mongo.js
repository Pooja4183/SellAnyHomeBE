const mongoose = require('mongoose');
const connect = () => {
  mongoose
    .connect(
      'mongodb+srv://poojatomarjt:sinhab11@cluster0.mawhhax.mongodb.net/?retryWrites=true&w=majority'

    )
    .then(() => {
      console.log('connected to database!');
    })
    .catch((err) => {
      console.log('connection failed!' + err);
    });
};

module.exports = { connect };
