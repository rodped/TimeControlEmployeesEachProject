const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const clientController = require("../controller/client.controller");
const jsonMessages = require("../assets/jsonMessages/dbMessages");
const authJwt = require("./verifyJwtToken");

// Inserir registo na base de dados
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  [
    check("name")
      .exists()
      .withMessage("O campo 'name' não pode ser nulo"),
    check("email")
      .exists()
      .withMessage("O campo 'email' não pode ser nulo")
      .isEmail()
      .withMessage("O campo 'email' tem de ser um email válido")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(jsonMessages.db.requiredData.status).json({
        errors: errors.array(),
        sucess: jsonMessages.db.requiredData.success,
        status: jsonMessages.db.requiredData.status
      });
    }
    clientController.create(req, res);
  }
);

// Mostrar todos os registos da base de dados
router.get("/", [authJwt.verifyToken], async (req, res) => {
  clientController.retrieveAll(req, res);
});

// Alterar um registo na base de dados pelo seu id
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  [
    check("name")
      .exists()
      .withMessage("O campo 'name' não pode ser nulo"),
    check("email")
      .exists()
      .withMessage("O campo 'email' não pode ser nulo")
      .isEmail()
      .withMessage("O campo 'email' tem de ser um email válido")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(jsonMessages.db.requiredData.status).json({
        errors: errors.array(),
        sucess: jsonMessages.db.requiredData.success,
        status: jsonMessages.db.requiredData.status
      });
    }
    const id = req.params.id;
    clientController.update(id, req, res);
  }
);

// Remover um registo na base de dados pelo seu id
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (req, res) => {
    clientController.remove(req.params.id, req, res);
  }
);

// Mostrar registo pelo seu id
router.get("/:id", [authJwt.verifyToken], async (req, res) => {
  clientController.retrieveById(req, res);
});

module.exports = router;
