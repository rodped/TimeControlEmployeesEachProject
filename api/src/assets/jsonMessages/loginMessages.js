module.exports = {
  user: {
    loginSucces: {
      msg: "Login Success",
      message: {
        eng: "Login with sucess",
        pt: "Login com sucesso"
      },
      status: 200,
      success: true
    },
    logoutSuccess: {
      msg: "Logout Success",
      message: {
        eng: "Logout with sucess",
        pt: "Sessão terminada com sucesso"
      },
      status: 200,
      success: true
    },
    isAdminSucces: {
      msg: "Is Admin Success",
      message: {
        eng: "The user has administrator privileges",
        pt: "O utilizador tem privilégios de administrador"
      },
      status: 200,
      success: true
    },
    loginError: {
      msg: "Login Error",
      message: {
        eng: "Invalid Login",
        pt: "Os dados que inseriu são inválidos"
      },
      status: 400,
      success: false
    },
    logoutError: {
      msg: "Logout Error",
      message: {
        eng: "You cannot logout. There is no active session",
        pt: "Não existe nenhuma sessão ativa"
      },
      status: 400,
      success: false
    },
    isAdminError: {
      msg: "Is Admin Error",
      message: {
        eng: "The user hasn't administrator privileges",
        pt: "O utilizador não tem privilégios de administrador"
      },
      status: 403,
      success: false
    },
    noTokenProvidedError: {
        msg: "No Token Provided Error",
        message: {
          eng: "There is no token provided",
          pt: "Nenhum token foi fornecido"
        },
        status: 500,
        success: false
      }
  }
};
