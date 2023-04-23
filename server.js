const express = require('express');
const path = require('path');
const env = require('dotenv').config();
const socket = require('socket.io');
const cors = require('cors');
const products = require('./src/product');
const mongoose = require('mongoose');
// const bodyParser = require(bodyParser)
// const ejs = require('ejs');

const app = express();

app.use(cors()); //Some CORS middleware

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/products', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  products()
    .then((data) => res.send(data))
    .catch((err) => res.send(err))
    .finally(console.log('Products delivered'));
});

// Static Files
if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(path.join(__dirname, '../../../sereneFrontend/build'))
  );
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'sereneFrontend/build', 'index.html'));
  });
}

// // Ready the input/output
// const io = socket(server);

// io.on('connection', (socket) => {
//   console.log(`connection established via id: ${socket.id}`);
//   socket.on('online', () => {
//     console.log('A new user has joined the chat');
//     io.sockets.emit('joined', {
//       success: true,
//     });
//   });

//   socket.on('chat', (data) => {
//     // console.log('initiated',data);
//     io.sockets.emit('chat', data);
//   });

//   socket.on('typing', (data) => {
//     socket.broadcast.emit('typing', data);
//   });
//   socket.on('no_typing', (data) => {
//     socket.broadcast.emit('no_typing', data);
//   });
// });

const server = app.listen(process.env.PORT, '127.0.0.1', () => {
  console.log('server started sucessfully');
});
