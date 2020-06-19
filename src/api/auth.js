import { post } from "./axios";

const API_LOGIN_URL = "/auth";

export const login = (name, password) => {
  return post(API_LOGIN_URL, {
    name,
    password,
  }).then((res) => res.data.data.token);
};
