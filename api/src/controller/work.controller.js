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

// Post a Work
async function create(req, res) {
  let idClient = -1;
  Client.findOne({
    where: {
      name: req.body.client
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
  const query = connect.con.query(
    "SELECT w.name, c.name AS client FROM works w INNER JOIN clients c ON w.clientId=c.id",
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
          await res.send(rows);
        }
      }
    }
  );
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
async function remove(id, req, res) {
  await Work.findByPk(id).then(work => {
    if (work === null)
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    else {
      try {
        const query = connect.con.query(
          "DELETE FROM works WHERE id = ?",
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
                .status(jsonMessages.db.error.status)
                .send(jsonMessages.db.error);
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

// Iniciar trabalho
async function startWork(req, res) {
  const date = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  let idUser = await verifyToken(req, res);
  let idWork = -1;

  Work.findOne({
    where: {
      name: req.body.work
    }
  }).then(work => {
    if (work === null) {
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    } else {
      idWork = work.id;

      if (idWork !== -1 && idUser !== -1) {
        Time.create({
          start: date,
          workId: idWork,
          userId: idUser
        })
          .then(time => {
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

// Fechar trabalho
async function endWork(req, res) {
  const date = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  let idUser = await verifyToken(req, res);
  let idWork = -1;

  Work.findOne({
    where: {
      name: req.body.work
    }
  }).then(work => {
    if (work === null) {
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    } else {
      idWork = work.id;

      if (idWork !== -1 && idUser !== -1) {
        Time.create({
          end: date,
          workId: idWork,
          userId: idUser
        })
          .then(time => {
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

// Calcular tempo de trabalho
async function timeWork(req, res) {
  //   Time.findAll({
  //     where: {
  //       workId: req.body.workId
  //     }
  //   }).then(times => {
  //     let endTime = moment(times[1].end);
  //     console.log("\nendTime: " + endTime);
  //     let startTime = moment(times[0].start);
  //     console.log("\nstartTime: " + startTime);
  //     let timeWork = moment.duration(endTime.diff(startTime));
  //     // timeWork = moment(timeWork).format("ss");
  //     timeWork = timeWork / 1000;
  //     console.log("\ntimeWork: " + timeWork);
  //     await res.send(timeWork);
  //   });

  let idWork = -1;

  Work.findOne({
    where: {
      name: req.body.work
    }
  }).then(work => {
    if (work === null) {
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    } else {
      idWork = work.id;
      console.log("\t\t" + idWork);

      if (idWork !== -1) {
        const query = connect.con.query(
          "SELECT start, end FROM times WHERE workId = ?",
          idWork,
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
                let endTime = moment(rows[1].end);
                let startTime = moment(rows[0].start);
                let timeWork = moment.duration(
                  endTime.diff(startTime, "hours", true)
                );
                await res.send(timeWork + "");
              }
            }
          }
        );
      }
    }
  });
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
  update,
  remove,
  startWork,
  endWork,
  timeWork
};
