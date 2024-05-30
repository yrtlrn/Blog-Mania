import { loginPageProps, signupPageProps } from "../@types";

const apiUrl = "http://localhost:3000/api/v1";
const headers = { "Content-Type": "application/json" };

const loginUser = async (data: loginPageProps) => {
  console.log(data);
  const res = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res;
};

const signupUser = async (data: signupPageProps) => {
  const res = await fetch(`${apiUrl}/users/register`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res;
};

const userAuth = async () => {
  const res = await fetch(`${apiUrl}/users/auth-check`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

const logoutUser = async () => {
  const res = await fetch(`${apiUrl}/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res;
};

export { loginUser, signupUser, userAuth, logoutUser };
