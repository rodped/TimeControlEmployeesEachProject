// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());

// require("./app/router/router.js")(app);

// const db = require("./app/config/db.config.js");

// const Role = db.role;

// // force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
//   initial();
// });

// // Create a Server
// var server = app.listen(8080, function() {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("App listening at http://%s:%s", host, port);
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "ADMIN"
//   });

//   Role.create({
//     id: 2,
//     name: "EMPLOYEE"
//   });
// }

//////////////////////////////////////////////////////////////////
const port = process.env.PORT || 8080;
const host = process.env.HOST || "127.0.0.1";

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"]
  })
);

app.listen(port, function(err) {
  if (!err) {
    console.log("Your app is listening on " + host + " and port " + port);
  } else {
    console.log(err);
  }
});

module.exports = app;
require("./loader.js");
