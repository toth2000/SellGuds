import { API } from "./index";

import {
  registerUrl,
  signInUrl,
  getUserByIdUrl,
} from "../../constants/serverApiUrl";

export const signIn = ({ email, password }) => {
  return API.post(`${signInUrl}`, { email: email, password: password });
};

export const signUp = ({ fullName, email, password }) => {
  return API.post(`${registerUrl}`, {
    fullName: fullName,
    email: email,
    password: password,
  });
};

export const getUserById = (id) => {
  return API.get(`${getUserByIdUrl}/${id}`);
};
