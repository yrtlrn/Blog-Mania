import { loginPageProps, signupPageProps } from "../types";

const apiUrl = "http://localhost:3000/api/v1";
const headers = { "Content-Type": "application/json" }

const loginUser = async (data: loginPageProps) => {
  const res = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  return res;
};

const signupUser = async (data: signupPageProps) => {
  const res = await fetch(`${apiUrl}/users/register`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  })
  return res
}

export { loginUser,signupUser };
