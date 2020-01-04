const app = require("./server");
const router = require("./src/routers/router.js");
const expressSanitizer = require("express-sanitizer");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const db = require("./src/config/db.config.js");
const Role = db.role;

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "ADMIN"
  });

  Role.create({
    id: 2,
    name: "EMPLOYEE"
  });
}

app.use("/", router);
module.exports = app;
