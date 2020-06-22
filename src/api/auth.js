import { post } from "./axios";
import { removeToken } from '../utils/auth';

const API_LOGIN_URL = "/auth";

export const login = (name, password) => {
  return post(API_LOGIN_URL, {
    name,
    password,
  }).then((res) => res.data.data.token);
};

export const logout = () => {
  removeToken();
}
