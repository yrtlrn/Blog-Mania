import {
  loginPageProps,
  accountPageProps,
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

const signupUser = async (data: FormData) => {
  const res = await fetch(`${apiUrl}/users/register`, {
    method: "POST",
    credentials: "include",
    body: data,
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

const accountData = async () => {
  const res = await fetch(`${apiUrl}/users/account`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

const editProfile = async (data: accountPageProps) => {
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

const saveArticle = async (articleId: string) => {
  const res = await fetch(`${apiUrl}/users/article/save`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify({
      articleId: articleId,
    }),
  });
  return res;
};

const getSavedArticles = async (page: string) => {
  const params = new URLSearchParams();
  params.append("page", page);
  return await fetch(`${apiUrl}/users/articles?${params}`, {
    method: "GET",
    credentials: "include",
  })
    .then((data) => {
      return data.json();
    })
    .catch((error: Error) => {
      console.log(error);
      return;
    });
};

const removeSavedArticle = async (articleId: string) => {
  const res = await fetch(
    `${apiUrl}/users/article/remove`,
    {
      method: "DELETE",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        articleId: articleId,
      }),
    }
  );
  return res;
};

export {
  loginUser,
  signupUser,
  userAuth,
  logoutUser,
  accountData,
  editProfile,
  settingData,
  editSettingData,
  saveArticle,
  getSavedArticles,
  removeSavedArticle,
};
