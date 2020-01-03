module.exports = {
  db: {
    createSucces: {
      msg: "Success",
      message: {
        eng: "Registered with success",
        pt: "Registado com sucesso"
      },
      status: 200,
      success: true
    },
    updateSucces: {
      msg: "Success",
      message: {
        eng: "Updated with success",
        pt: "Alterado com sucesso"
      },
      status: 200,
      success: true
    },
    deleteSucces: {
      msg: "Success",
      message: {
        eng: "Deleted with success",
        pt: "Apagado com sucesso"
      },
      status: 200,
      success: true
    },
    mailError: {
      msg: "Error",
      message: {
        eng: "Email not sent",
        pt: "Não foi possível enviar o email"
      },
      status: 204,
      success: false
    },
    duplicateEmail: {
      msg: "DuplicateValues",
      message: {
        eng: "Email already registered",
        pt: "O e-mail já se encontra registado"
      },
      status: 409,
      success: false
    },
    duplicateUsername: {
      msg: "DuplicateValues",
      message: {
        eng: "Username already registered",
        pt: "O username já se encontra registado"
      },
      status: 409,
      success: false
    },
    noRecords: {
      msg: "No records found",
      message: {
        eng: "No Records found",
        pt: "Não foram encontrados dados"
      },
      status: 404,
      success: false
    },
    requiredData: {
      msg: "dataMissing",
      message: {
        eng: "Required fields are missing",
        pt: "Falta preencher dados obrigatórios"
      },
      success: false,
      status: 422
    },
    error: {
      msg: "Error",
      message: {
        eng: "Something went wrong",
        pt: "Algo de errado aconteceu"
      },
      status: 503,
      success: false
    }
  }
};
