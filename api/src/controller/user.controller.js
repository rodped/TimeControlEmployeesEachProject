const config = require("../config/config.js");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const connect = require("../config/connectMySQL");
const jsonMessages = require("../assets/jsonMessages/dbMessages");
const loginMessages = require("../assets/jsonMessages/loginMessages");
const db = require("../config/db.config.js");
const mailController = require("./mail.Controller");

const Op = db.Sequelize.Op;
const User = db.user;
const Role = db.role;
const ROLEs = config.ROLEs;

// Inserir registo na base de dados
async function create(req, res) {
  const password1 = makePassword(3, 3, 2, 2);
  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(password1, 8)
  })
    .then(user => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      })
        .then(roles => {
          user.setRoles(roles).then(() => {
            if (mailController.sendMail(password1, req, res)) {
              return res
                .status(jsonMessages.db.createSucces.status)
                .send(jsonMessages.db.createSucces);
            } else {
              return res
                .status(jsonMessages.db.mailError.status)
                .send(jsonMessages.db.mailError);
            }
          });
        })
        .catch(err => {
          return res
            .status(jsonMessages.db.noRecords.status)
            .send(jsonMessages.db.noRecords);
        });
    })
    .catch(err => {
      return res
        .status(jsonMessages.db.error.status)
        .send(jsonMessages.db.error);
    });
}

// Mostrar todos os registos da base de dados
async function retrieveAll(req, res) {
  let exposedHeaders = "X-Total-Count";
  try {
    const query = connect.con.query(
      "SELECT u.id, u.name, u.username, u.email, r.name AS role FROM users u INNER JOIN user_roles u_r ON u.id=u_r.userId INNER JOIN roles r ON u_r.roleId=r.Id",
      async function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
          console.log(err);
          await res
            .status(jsonMessages.db.dbError.status)
            .send(jsonMessages.db.dbError);
        } else {
          if (rows.length == 0) {
            await res
              .status(jsonMessages.db.noRecords.status)
              .send(jsonMessages.db.noRecords);
          } else {
            User.count().then(user => {
              res.header(exposedHeaders, user);
              res.send(rows);
            });
          }
        }
      }
    );
  } catch (error) {
    await res.status(jsonMessages.db.error.status).send(jsonMessages.db.error);
  }
}

// Alterar um registo na base de dados pelo seu id
async function update(id, req, res) {
  await User.findByPk(id).then(user => {
    if (user === null)
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    else {
      const name = req.body.name;
      const email = req.body.email;
      const date = new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      try {
        const update = [name, email, date, id];
        const query = connect.con.query(
          "UPDATE users SET name =?, email =?, updatedAt=? WHERE id=?",
          update,
          async function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
              return res
                .status(jsonMessages.db.updateSucces.status)
                .send(jsonMessages.db.updateSucces);
            } else {
              console.log(err);
              if (err.code == "ER_DUP_ENTRY") {
                return res
                  .status(jsonMessages.db.duplicateEmail.status)
                  .send(jsonMessages.db.duplicateEmail);
              } else
                return res
                  .status(jsonMessages.db.dbError.status)
                  .send(jsonMessages.db.dbError);
            }
          }
        );
      } catch (error) {
        return res
          .status(jsonMessages.db.error.status)
          .send(jsonMessages.db.error);
      }
    }
  });
}

// Remover um registo na base de dados pelo seu id
async function remove(id, req, res) {
  await User.findByPk(id).then(user => {
    if (user === null)
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    else {
      try {
        const query = connect.con.query(
          "DELETE FROM users WHERE id = ?",
          id,
          async function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
              return res
                .status(jsonMessages.db.deleteSucces.status)
                .send(jsonMessages.db.deleteSucces);
            } else {
              console.log(err);
              return res
                .status(jsonMessages.db.dbError.status)
                .send(jsonMessages.db.dbError);
            }
          }
        );
      } catch (error) {
        return res
          .status(jsonMessages.db.error.status)
          .send(jsonMessages.db.error);
      }
    }
  });
}

// Mostrar um registo pelo seu id
async function retrieveById(req, res) {
  let exposedHeaders = "X-Total-Count";
  try {
    const query = connect.con.query(
      "SELECT u.id, u.name, u.username, u.email, r.name AS role FROM users u INNER JOIN user_roles u_r ON u.id=u_r.userId INNER JOIN roles r ON u_r.roleId=r.Id WHERE u.id = ?",
      req.params.id,
      async function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
          console.log(err);
          res
            .status(jsonMessages.db.dbError.status)
            .send(jsonMessages.db.dbError);
          return;
        } else {
          if (rows.length == 0) {
            res
              .status(jsonMessages.db.noRecords.status)
              .send(jsonMessages.db.noRecords);
            return;
          } else {
            res.header(exposedHeaders, 1);
            res.send(rows[0]);
          }
        }
      }
    );
  } catch (error) {
    res.status(jsonMessages.db.error.status).send(jsonMessages.db.error);
    return;
  }
}

// Mostrar um registo pelo seu username
async function retrieveByUsername(req, res) {
  let rows1 = null;
  try {
    const query = connect.con.query(
      "SELECT u.id, u.name, u.username, u.email, r.name AS role FROM users u INNER JOIN user_roles u_r ON u.id=u_r.userId INNER JOIN roles r ON u_r.roleId=r.Id WHERE u.username = ?",
      req.body.username,
      async function(err, rows) {
        console.log(query.sql);
        if (err) {
          console.log(err);
          return res
            .status(jsonMessages.db.dbError.status)
            .send(jsonMessages.db.dbError);
        } else {
          if (rows.length == 0) {
            return res
              .status(jsonMessages.db.noRecords.status)
              .send(jsonMessages.db.noRecords);
          } else {
            console.log(
              "\n::::: JSON.stringify(rows1): 1st" +
                JSON.stringify(rows1) +
                " ::::::\n"
            );
            return (rows1 = await rows);
          }
        }
      }
    );
  } catch (error) {
    return res.status(jsonMessages.db.error.status).send(jsonMessages.db.error);
  }
  console.log(
    "\n::::: JSON.stringify(rows1) 2nd: " + JSON.stringify(rows1) + " ::::::\n"
  );
  return rows1;
}

// Login de utilizador
async function login(req, res) {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res
          .status(jsonMessages.db.noRecords.status)
          .send(jsonMessages.db.noRecords);
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res
          .status(loginMessages.user.loginError.status)
          .send(loginMessages.user.loginError);
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          auth: true,
          accessToken: token,
          username: user.username,
          authorities: authorities
        });
      });
    })
    .catch(err => {
      res.status(500).send({ reason: err.message });
    });

  //   const password = req.body.password;
  //   const user = await retrieveByUsername(req, res);
  //   console.log("\n:::::" + JSON.stringify(user) + "::::::\n");
  //   try {
  //     let idUser = user[0].id;
  //     let username = user[0].username;
  //     let passwordUser = user[0].password;
  //     let role = user[0].role;
  //     console.log(
  //       "\npassword: " + password + "\npasswordUser: " + passwordUser + "\n"
  //     );
  //     bcrypt.compare(password, passwordUser, async function(err, res) {
  //       if ((res = true)) {
  //         let token = jwt.sign({ id: idUser }, config.secret, {
  //           expiresIn: 86400 // expires in 24 hours
  //         });
  //         console.log("\ntoken: " + token + "\n");

  //         await res.status(200).send({
  //           auth: true,
  //           accessToken: token,
  //           username: username,
  //           authorities: role
  //         });
  //       } else {
  //         await res
  //           .status(loginMessages.user.loginError.status)
  //           .send(loginMessages.user.loginError);
  //       }
  //     });
  //   } catch (error) {
  //     await res.status(jsonMessages.db.error.status).send(jsonMessages.db.error);
  //   }
}

// Verificar se utilizador é administrador
async function isAdmin(req, res, next) {
  // await verifyToken(req, res);
  try {
    const query = connect.con.query(
      "SELECT r.name AS role FROM users u INNER JOIN user_roles u_r ON u.id=u_r.userId INNER JOIN roles r ON u_r.roleId=r.Id WHERE u.id = ?",
      id,
      async function(err, rows) {
        console.log(query.sql);
        if (err) {
          console.log(err);
          res
            .status(jsonMessages.db.dbError.status)
            .send(jsonMessages.db.dbError);
          return;
        } else {
          if (rows.length == 0) {
            res
              .status(jsonMessages.db.noRecords.status)
              .send(jsonMessages.db.noRecords);
            return;
          } else {
            if (rows[0].role == "ADMIN") {
              next();
              return;
            } else {
              res
                .status(loginMessages.user.isAdminError.status)
                .send(loginMessages.user.isAdminError);
              return;
            }
          }
        }
      }
    );
  } catch (error) {
    res.status(jsonMessages.db.error.status).send(jsonMessages.db.error);
    return;
  }
}

/////////////// Auxiliar ///////////////

// Criar password aleatória
const makePassword = (
  lengthUpperCase,
  lengthLowerCase,
  lengthNumber,
  lengthSpecialCharacter
) => {
  let result = "";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "1234567890";
  const specialCharacters = "!@#$%&*_-+.,";
  const upperCaseLength = upperCase.length;
  const lowerCaseLength = lowerCase.length;
  const numbersLength = numbers.length;
  const specialCharacterLength = specialCharacters.length;

  for (let i = 0; i < lengthUpperCase; i++) {
    result += upperCase.charAt(Math.floor(Math.random() * upperCaseLength));
  }
  for (let i = 0; i < lengthLowerCase; i++) {
    result += lowerCase.charAt(Math.floor(Math.random() * lowerCaseLength));
  }
  for (let i = 0; i < lengthNumber; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbersLength));
  }
  for (let i = 0; i < lengthSpecialCharacter; i++) {
    result += specialCharacters.charAt(
      Math.floor(Math.random() * specialCharacterLength)
    );
  }
  return shuffle(result);
};
const shuffle = word => {
  const a = word.split("");
  const n = a.length;

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

// Verificar se a role existe
async function checkRolesExisted(req, res) {
  for (let i = 0; i < req.body.roles.length; i++)
    if (!ROLEs.includes(req.body.roles[i].toUpperCase())) return false;
  return true;
}

// Verificar se foi fornecido um token
async function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(loginMessages.user.noTokenProvidedError.status)
      .send(loginMessages.user.noTokenProvidedError);
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(loginMessages.user.loginError.status)
        .send(loginMessages.user.loginError);
    }
    id = decoded.id;
    next();
  });
}

module.exports = {
  create,
  retrieveAll,
  update,
  remove,
  login,
  isAdmin,
  retrieveById,
  checkRolesExisted,
  verifyToken
};
