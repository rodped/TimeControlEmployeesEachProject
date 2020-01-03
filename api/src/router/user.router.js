const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const userController = require("../controller/user.controller");
const jsonMessages = require("../assets/jsonMessages/dbMessages");

// Inserir registo na base de dados
router.post(
  "/",
  [
    check("name")
      .exists()
      .withMessage("O campo 'name' não pode ser nulo"),
    check("username")
      .exists()
      .withMessage("O campo 'username' não pode ser nulo"),
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
    if ((await userController.checkRolesExisted(req, res)) === false) {
      return res
        .status(jsonMessages.db.requiredData.status)
        .send(jsonMessages.db.requiredData);
    }
    // if ((await userController.checkRolesExisted(req, res)) === true)
    await userController.create(req, res);
  }
);

// Mostrar todos os registos da base de dados
router.get("/", async (req, res) => {
  userController.retrieveAll(req, res);
});

// Alterar um registo na base de dados pelo seu id
router.put(
  "/:id",
  [
    check("name")
      .exists()
      .withMessage("O campo 'name' não pode ser nulo"),
    check("email")
      .exists()
      .withMessage("O campo 'email' não pode ser nulo")
      .isEmail()
      .withMessage("O campo 'email' tem de ser um email válido"),
    userController.isAdmin
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
    userController.update(id, req, res);
  }
);

// Remover um registo na base de dados pelo seu id
router.delete("/:id", [userController.isAdmin], async (req, res) => {
  userController.remove(req.params.id, req, res);
});

// Login de utilizador
router.post(
  "/login",
  [
    check("username")
      .exists()
      .withMessage("O campo 'username' não pode ser nulo"),
    check("password")
      .exists()
      .withMessage("O campo 'password' não pode ser nulo")
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
    userController.login(req, res);
  }
);

// Verificar se um utilizador é administrador
router.get("/isAdmin", async (req, res) => {
  userController.isAdmin(req, res);
});

module.exports = router;
