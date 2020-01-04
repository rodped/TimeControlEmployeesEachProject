let jwt = require("jsonwebtoken");

const connect = require("../config/connectMySQL");
const jsonMessages = require("../assets/jsonMessages/dbMessages");
const db = require("../config/db.config.js");

const Client = db.client;

// Inserir registo na base de dados
async function create(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const date = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  try {
    const post = { name: name, email: email, createdAt: date, updatedAt: date };
    const query = connect.con.query(
      "INSERT INTO clients SET ?",
      post,
      async function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
          await res
            .status(jsonMessages.db.createSucces.status)
            .send(jsonMessages.db.createSucces);
        } else {
          console.log(err);
          if (err.code == "ER_DUP_ENTRY") {
            await res
              .status(jsonMessages.db.duplicateEmail.status)
              .send(jsonMessages.db.duplicateEmail);
          } else
            await res
              .status(jsonMessages.db.error.status)
              .send(jsonMessages.db.error);
        }
      }
    );
  } catch (error) {
    await res.status(jsonMessages.db.error.status).send(jsonMessages.db.error);
  }
}

// Mostrar todos os registos da base de dados
async function retrieveAll(req, res) {
  let exposedHeaders = "content-range";
  Client.findAndCountAll({
    attributes: ["id", "name", "email"]
  }).then(client => {
    if (client === null) {
      res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
      return;
    } else {
      res.header(exposedHeaders, client.count);
      res.send(client.rows);
    }
  });
}

// Alterar um registo na base de dados pelo seu id
async function update(id, req, res) {
  await Client.findByPk(id).then(client => {
    if (client === null)
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
          "UPDATE clients SET name =?, email =?, updatedAt=? WHERE id=?",
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
  await Client.findByPk(id).then(client => {
    if (client === null)
      return res
        .status(jsonMessages.db.noRecords.status)
        .send(jsonMessages.db.noRecords);
    else {
      try {
        const query = connect.con.query(
          "DELETE FROM clients WHERE id = ?",
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

module.exports = {
  create,
  retrieveAll,
  update,
  remove
};
