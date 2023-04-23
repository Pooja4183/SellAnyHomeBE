const http = require('http');
const app = require('./app/app.js');

const port = 5000;

app.set('port', port);
const server = http.createServer(app);
console.log("Server Started....");
server.listen(port);
console.log("Listening on port",port);
