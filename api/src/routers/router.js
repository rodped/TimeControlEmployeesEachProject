// const verifySignUp = require("./verifySignUp");
// const authJwt = require("./verifyJwtToken");

// module.exports = function(app) {
//   const controller = require("../controller/controller.js");
//   const workController = require("../controller/work.controller");
//   const clientController = require("../controller/client.controller");

//   app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post(
//     "/api/auth/signup",
//     [
//       verifySignUp.checkDuplicateUserNameOrEmail,
//       verifySignUp.checkRolesExisted
//     ],
//     controller.signup
//   );

//   app.post("/api/auth/signin", controller.signin);

//   app.get("/api/test/user", [authJwt.verifyToken], controller.userContent);

//   app.get(
//     "/api/test/pm",
//     [authJwt.verifyToken, authJwt.isPmOrAdmin],
//     controller.managementBoard
//   );

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );

//   app.post("/api/work", workController.create);

//   app.post("/api/client", clientController.create);
// //   app.get("/api/clientAll", clientController.retrieveAll);
// };

///////////////////////////////////////////////////////////////////////

const router = require("express").Router();

const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");

const controller = require("../controller/controller.js");

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/api/auth/signup",
  [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post("/api/auth/signin", controller.signin);

router.get("/api/test/user", [authJwt.verifyToken], controller.userContent);

router.get(
  "/api/test/pm",
  [authJwt.verifyToken, authJwt.isPmOrAdmin],
  controller.managementBoard
);

router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

router.use("/clients", require("./client.router"));
router.use("/users", require("./user.router"));
router.use("/works", require("./work.router"));

module.exports = router;
