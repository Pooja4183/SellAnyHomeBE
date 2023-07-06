const mongoose = require('mongoose');
const connect = () => {
  mongoose
    .connect(
     // 'mongodb+srv://sellanyhome55:arush555@sellanyhomecluster.cmadjgc.mongodb.net/test?retryWrites=true&w=majority'
     'mongodb+srv://superuser:user123@localhost:27017/admin?retryWrites=true&w=majority'
      ,
     { 
      useNewUrlParser: true,
      useUnifiedTopology: true
      }
    )
    .then(() => {
      console.log('connected to database!');
    })
    .catch((err) => {
      console.log('connection failed!' , err);
    });
};

mongoose.set('debug', true);
module.exports = { connect };
