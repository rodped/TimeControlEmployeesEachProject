const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../config/db.config.js");
const User = db.user;

const jsonMessages = require("../assets/jsonMessages/dbMessages");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  console.log("\n\n"+token+"\n\n")

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided. !!!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Fail to Authentication. Error -> " + err
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user !== null) {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          console.log(roles[i].name);
          if (roles[i].name.toUpperCase() === "ADMIN") {
            next();
            return;
          }
        }

        res.status(403).send("Require Admin Role!");
        return;
      });
    } else {
      res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
      return;
    }
  });
};

isPmOrAdmin = (req, res, next) => {
  User.findById(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toUpperCase() === "PM") {
          next();
          return;
        }

        if (roles[i].name.toUpperCase() === "ADMIN") {
          next();
          return;
        }
      }

      res.status(403).send("Require PM or Admin Roles!");
    });
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;

module.exports = authJwt;
