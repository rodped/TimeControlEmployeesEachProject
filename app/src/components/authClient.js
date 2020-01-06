import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
  AUTH_GET_PERMISSIONS
} from "admin-on-rest";
import decodeJwt from "jwt-decode";

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request("http://localhost:8080/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" })
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ accessToken }) => {
        const decodedToken = decodeJwt(accessToken);
        localStorage.setItem("x-access-token", accessToken);
        localStorage.setItem("role", decodedToken.role);
      });
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("role");
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params.message.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("x-access-token");
      localStorage.removeItem("role");
      return Promise.reject();
    }
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    const { resource } = params;
    if (resource === "users") {
      return localStorage.getItem("role")
        ? Promise.resolve()
        : Promise.reject({ redirectTo: "/no-access" });
    }
    if (resource === "clients") {
      return localStorage.getItem("role")
        ? Promise.resolve()
        : Promise.reject({ redirectTo: "/no-access" });
    }
    return localStorage.getItem("x-access-token")
      ? Promise.resolve()
      : Promise.reject();
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem("role");
    return Promise.resolve(role);
  }

  return Promise.reject("Unknown method");
};
