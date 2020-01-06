const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const workController = require("../controller/work.controller");
const jsonMessages = require("../assets/jsonMessages/dbMessages");
const authJwt = require("./verifyJwtToken");

// Inserir registo na base de dados
router.post(
  "/",
  [authJwt.verifyToken],
  [
    check("name")
      .exists()
      .withMessage("O campo 'name' não pode ser nulo"),
    check("client")
      .exists()
      .withMessage("O campo 'client' não pode ser nulo")
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
    workController.create(req, res);
  }
);

// Mostrar todos os registos da base de dados
router.get("/", [authJwt.verifyToken], async (req, res) => {
  workController.retrieveAll(req, res);
});

// Mostrar registo pelo seu id
router.get("/:id", [authJwt.verifyToken], async (req, res) => {
  workController.retrieveById(req, res);
});

// Alterar um registo na base de dados pelo seu id
router.put(
  "/:id",
  [authJwt.verifyToken],
  [
    check("name")
      .exists()
      .withMessage("O campo 'name' não pode ser nulo")
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
    workController.update(id, req, res);
  }
);

// Remover um registo na base de dados pelo seu id
router.delete("/:id", [authJwt.verifyToken], async (req, res) => {
  workController.remove(req, res);
});

// Iniciar trabalho
router.post(
  "/startWork",
  [authJwt.verifyToken],
  [
    check("id")
      .exists()
      .withMessage("O campo 'id' não pode ser nulo")
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
    workController.startWork(req, res);
  }
);

// Fechar trabalho
router.post(
  "/endWork",
  [authJwt.verifyToken],
  [
    check("id")
      .exists()
      .withMessage("O campo 'id' não pode ser nulo")
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
    workController.endWork(req, res);
  }
);

// Calcular tempo de trabalho
router.get("/timeWork/:id", [authJwt.verifyToken], async (req, res) => {
  workController.timeWork(req, res);
});

module.exports = router;
