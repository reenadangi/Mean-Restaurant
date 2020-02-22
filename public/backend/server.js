const path=require("path")
const express=require('express');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.json());
app.use("/images",express.static(path.join("backend/images")))
app.use((req,res,next)=>{
   
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept,Authorization");
res.setHeader('Access-Control-Allow-Methods',"GET,POST,PATCH,DELETE,OPTIONS,PUT");
next();
});


const debug = require("debug")("node-angular");
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

require('./config/mongoos.js');

require("./config/routes.js")(app);
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);