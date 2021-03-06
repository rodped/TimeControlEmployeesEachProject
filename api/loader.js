const app = require("./server");
const router = require("./src/routers/router.js");
const expressSanitizer = require("express-sanitizer");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require('express-session');
const bcrypt = require("bcrypt");
const db = require("./src/config/db.config.js");
const Role = db.role;
const User = db.user;

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(
  session({
    secret: "webbookfca",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 60000,
      httpOnly: true
    }
  })
);

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
  initial();
});

const roles1 = ["ADMIN"];

function initial() {
  Role.create({
    id: 1,
    name: "ADMIN"
  });

  Role.create({
    id: 2,
    name: "EMPLOYEE"
  });

  User.create({
    id: 1,
    name: "Administrator",
    username: "admin",
    email: "admin@mail.com",
    password: bcrypt.hashSync("admin", 8)
  }).then(user => {
    Role.findAll({
      where: {
        id: 1
      }
    }).then(roles => {
      user.setRoles(roles);
    });
  });
}

app.use("/", router);
module.exports = app;
