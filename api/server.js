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
require("./loader.js").default;
