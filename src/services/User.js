import {postData, fetchData} from "./api";

export function userLogin(data) {
  return postData('login', data);
}

export function userRegister(data) {
  return postData('register', data);
}

export function userLogout() {
  return postData('logout');
}

export function findUserByUsername(username) {
  return fetchData('user/getByName', {username});
}