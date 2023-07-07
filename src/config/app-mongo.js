const mongoose = require('mongoose');
const connect = () => {
  mongoose
    .connect(
     // 'mongodb+srv://sellanyhome55:arush555@sellanyhomecluster.cmadjgc.mongodb.net/test?retryWrites=true&w=majority'
     //'mongodb+srv://superuser:user123@localhost:27017/admin?retryWrites=true&w=majority'
     'mongodb://superuser:user123@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1' 
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
