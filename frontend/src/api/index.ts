import {
  loginPageProps,
  profilePageProps,
  signupPageProps,
} from "../@types";

const apiUrl = "http://localhost:3000/api/v1";
const headers = { "Content-Type": "application/json" };

const loginUser = async (data: loginPageProps) => {
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

const profileData = async () => {
  const res = await fetch(`${apiUrl}/users/profile`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

const editProfile = async (data: profilePageProps) => {
  const res = await fetch(`${apiUrl}/users/profile`, {
    method: "PUT",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res;
};

const settingData = async () => {
  const res = await fetch(`${apiUrl}/users/setting`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

const editSettingData = async (
  contentDisplay: string,
  accountVisibility: string,
  hideFollowers: string,
  hideFollowing: string
) => {
  const res = await fetch(`${apiUrl}/users/setting`, {
    method: "PUT",
    headers: headers,
    credentials: "include",
    body: JSON.stringify({
      contentDisplay: contentDisplay,
      accountVisibility: accountVisibility,
      hideFollowers: hideFollowers === "true",
      hideFollowing: hideFollowing === "true",
    }),
  });
  return res;
};

export {
  loginUser,
  signupUser,
  userAuth,
  logoutUser,
  profileData,
  editProfile,
  settingData,
  editSettingData,
};
