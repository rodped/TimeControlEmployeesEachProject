let moment = require("moment");
let jwt = require("jsonwebtoken");

const config = require("../config/config.js");
const connect = require("../config/connectMySQL");
const jsonMessages = require("../assets/jsonMessages/dbMessages");
const loginMessages = require("../assets/jsonMessages/loginMessages");
const db = require("../config/db.config.js");
const userController = require("./user.controller");

const Work = db.work;
const Client = db.client;
const Time = db.time;

// Inserir registo na base de dados
async function create(req, res) {
  let idClient = -1;
  Client.findOne({
    where: {
      id: req.body.client
    }
  }).then(client => {
    if (client === null) {
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    } else {
      idClient = client.id;
      if (idClient !== -1) {
        Work.create({
          name: req.body.name,
          clientId: idClient
        })
          .then(work => {
            return res
              .status(jsonMessages.db.createSucces.status)
              .send(jsonMessages.db.createSucces);
          })
          .catch(err => {
            return res
              .status(jsonMessages.db.error.status)
              .send(jsonMessages.db.error);
          });
      }
    }
  });
}

// Mostrar todos os registos da base de dados
async function retrieveAll(req, res) {
  let exposedHeaders = "X-Total-Count";
  const query = connect.con.query(
    "SELECT w.id, w.name, c.name AS client FROM works w INNER JOIN clients c ON w.clientId=c.id",
    async function(err, rows, fields) {
      console.log(query.sql);
      if (err) {
        console.log(err);
        await res
          .status(jsonMessages.db.error.status)
          .send(jsonMessages.db.error);
      } else {
        Work.count().then(work => {
          res.header(exposedHeaders, work);
          res.send(rows);
        });
      }
    }
  );
}

// Mostrar um registo pelo seu id
async function retrieveById(req, res) {
  let exposedHeaders = "X-Total-Count";
  try {
    const query = connect.con.query(
      "SELECT w.id, w.name, c.name AS client FROM works w INNER JOIN clients c ON w.clientId=c.id WHERE w.id = ?",
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

// Alterar um registo na base de dados pelo seu id
async function update(id, req, res) {
  await Work.findByPk(id).then(work => {
    if (work === null)
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    else {
      const name = req.body.name;
      const date = new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      try {
        const update = [name, date, id];
        const query = connect.con.query(
          "UPDATE works SET name =?, updatedAt=? WHERE id=?",
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
async function remove(req, res) {
  Work.destroy({
    where: {
      id: req.params.id
    }
  }).then(work => {
    if (work === null) {
      res
        .status(jsonMessages.db.deleteSucces.status)
        .send(jsonMessages.db.deleteSucces);
      return;
    } else {
      res
        .status(jsonMessages.db.deleteSucces.status)
        .send(jsonMessages.db.deleteSucces);
      return;
    }
  });

  // });
  // await Work.findByPk(id).then(work => {
  //   if (work === null)
  //     return res
  //       .status(jsonMessages.db.noRecords.status)
  //       .send(jsonMessages.db.noRecords);
  //   else {
  //     try {
  //       const query = connect.con.query(
  //         "DELETE FROM works WHERE id = ?",
  //         id,
  //         async function(err, rows, fields) {
  //           console.log(query.sql);
  //           if (!err) {
  //             return res
  //               .status(jsonMessages.db.deleteSucces.status)
  //               .send(jsonMessages.db.deleteSucces);
  //           } else {
  //             console.log(err);
  //             return res
  //               .status(jsonMessages.db.error.status)
  //               .send(jsonMessages.db.error);
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       return res
  //         .status(jsonMessages.db.error.status)
  //         .send(jsonMessages.db.error);
  //     }
  //   }
  // });
}

// Iniciar trabalho
async function startWork(req, res) {
  const date = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  let idUser = await verifyToken(req, res);
  let idWork = req.body.id;

  if (idUser !== -1) {
    Work.findOne({
      where: {
        id: idWork
      }
    }).then(work => {
      if (work === null) {
        return res
          .status(jsonMessages.db.noRecords.status)
          .send(jsonMessages.db.noRecords);
      } else {
        idWork = work.id;

        Time.create({
          start: date,
          workId: idWork,
          userId: idUser
        }).then(time => {
          if (time == null) {
            return res
              .status(jsonMessages.db.error.status)
              .send(jsonMessages.db.error);
          } else {
            return res
              .status(jsonMessages.db.createSucces.status)
              .send(jsonMessages.db.createSucces);
          }
        });
      }
    });
  } else {
    return res
      .status(jsonMessages.db.noRecords.status)
      .send(jsonMessages.db.noRecords);
  }
}

// Fechar trabalho
async function endWork(req, res) {
  const date = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  let idUser = await verifyToken(req, res);
  let idWork = req.body.id;

  if (idUser !== -1) {
    Work.findOne({
      where: {
        id: idWork
      }
    }).then(work => {
      if (work === null) {
        return res
          .status(jsonMessages.db.noRecords.status)
          .send(jsonMessages.db.noRecords);
      } else {
        idWork = work.id;

        Time.update(
          {
            end: date
          },
          {
            where: {
              workId: idWork,
              userId: idUser
            }
          }
        ).then(time => {
          if (time == null) {
            return res
              .status(jsonMessages.db.error.status)
              .send(jsonMessages.db.error);
          } else {
            return res
              .status(jsonMessages.db.createSucces.status)
              .send(jsonMessages.db.createSucces);
          }
        });
      }
    });
  } else {
    return res
      .status(jsonMessages.db.noRecords.status)
      .send(jsonMessages.db.noRecords);
  }
}

// Calcular tempo de trabalho
async function timeWork(req, res) {
  const query = connect.con.query(
    "SELECT w.id, w.name AS work, c.name AS client, u.name AS employee, " +
      "DATE_FORMAT(t.start,'%Y-%m%-%d %H:%i:%s') AS startTime, " +
      "DATE_FORMAT(t.end,'%Y-%m%-%d %H:%i:%s') AS endTime, " +
      "CONCAT(FLOOR(TIMESTAMPDIFF(SECOND, t.start, t.end) / 3600), ' Hours, ', " +
      "FLOOR((TIMESTAMPDIFF(SECOND, t.start, t.end) % 3600)/60), ' Minutes, ', " +
      "(TIMESTAMPDIFF(SECOND, t.start, t.end) % 60), ' Seconds') AS workTime " +
      "FROM clients c INNER JOIN works w ON c.id=w.clientId " +
      "INNER JOIN times t ON w.id = t.workId " +
      "INNER JOIN users u ON t.userId=u.id " +
      "WHERE w.id = ?",
    req.params.id,
    async function(err, rows, fields) {
      console.log(query.sql);
      if (err) {
        console.log(err);
        await res
          .status(jsonMessages.db.error.status)
          .send(jsonMessages.db.error);
      } else {
        if (rows.length == 0) {
          await res
            .status(jsonMessages.db.noRecords.status)
            .send(jsonMessages.db.noRecords);
        } else {
          res.send(rows);
        }
      }
    }
  );
}

// Verificar se foi fornecido um token
async function verifyToken(req, res) {
  let id = -1;
  let token = req.headers["x-access-token"];
  if (!token) {
    res
      .status(loginMessages.user.noTokenProvidedError.status)
      .send(loginMessages.user.noTokenProvidedError);
    return;
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res
        .status(loginMessages.user.loginError.status)
        .send(loginMessages.user.loginError);
      return;
    }
    id = decoded.id;
  });
  return id;
}

module.exports = {
  create,
  retrieveAll,
  retrieveById,
  update,
  remove,
  startWork,
  endWork,
  timeWork
};
