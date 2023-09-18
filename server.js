// const http = require("http"); //import

// //import express and have to use app as listener for incoming request
// const app = require('./backend/app'); 

// //tell express on which port we are working
// const port = process.env.PORT || 3000;
// app.set('port', port);

// //create server with express:
// const server = http.createServer(app);

// //!create server without express:
// // const server = http.createServer((req, res) => {
// //     res.end('This is my first node response!');
// // });

// //listen to the server:
// server.listen(process.env.PORT || 3000);

//-------------------------- server.js ----------------------------

const app = require("./backend/app");
const debug = require("debug")("node-angular"); // package following by identifier
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);