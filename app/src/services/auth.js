import api from "./api";

export const TOKEN_KEY = "x-access-token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (accessToken) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
// export const getUsername = async e => {
//   const accessToken = {
//     'headers': {
//       'x-access-token': getToken()
//     }
//   }
//   const result = await api.get("https://localhost:8080/api/test/user", accessToken);
//   return result.data.user.username;
// }
// export const getRole = async e => {
//   const accessToken = {
//     'headers': {
//       'x-access-token': getToken()
//     }
//   }
//   const result = await api.get("https://localhost:8080/api/test/user", accessToken);
//   const name = await result.data.user.roles.map(role => { return role.name })
//   return name.toString();
// }
// export const getEmail = async e => {
//   const accessToken = {
//     'headers': {
//       'x-access-token': getToken()
//     }
//   }
//   const result = await api.get("https://localhost:8080/api/test/user", accessToken);
//   return result.data.user.email;
// }