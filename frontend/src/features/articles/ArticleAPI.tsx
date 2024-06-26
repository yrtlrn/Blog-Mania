export type articleType = {
  _id: string;
  title: string;
  author: string;
  otherPeople: Array<string>;
  tag: string;
  content: string;
  media: Array<string>;
  likes: Array<string>;
  comments: Array<{
    username: string;
    content: string;
    date: string;
  }>;
};

const headers = { "Content-Type": "application/json" };

const apiUrl = "http://localhost:3000/api/v1";

const getAllArticles = async (
  page: string,
  setError: Function
) => {
  const params = new URLSearchParams();
  params.append("page", page);
  return await fetch(`${apiUrl}/articles?${params}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((error: Error) => {
      setError(error);
      return;
    });
};

const getTagArticles = async (
  page: string,
  tag: string,
  setError: Function
) => {
  const params = new URLSearchParams();

  params.append("page", page);

  params.append(
    "tag",
    tag![0].toUpperCase() + tag?.slice(1)
  );
  return await fetch(
    `${apiUrl}/articles/search/tag?${params}`,
    {
      method: "GET",
    }
  )
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      setError({
        name: "Error",
        message: "Something went wrong",
      });
    })
    .catch((error: Error) => {
      setError(error);
      return;
    });
};

const userLikeArticle = async (articleId: string) => {
  const res = await fetch(`${apiUrl}/articles/like`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify({ articleId: articleId }),
  });
  return res;
};

const commentArticle = async (
  articleId: string,
  content: string
) => {
  const res = await fetch(`${apiUrl}/articles/comment`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify({
      articleId: articleId,
      comment: content,
    }),
  });
  return res;
};

const editAComment = async (
  articleId: string,
  newComment: string
) => {
  const res = await fetch(
    `${apiUrl}/articles/comment/edit`,
    {
      method: "PUT",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({
        articleId: articleId,
        newComment: newComment,
      }),
    }
  );
  return res;
};
const deleteAComment = async (articleId: string) => {
  const res = await fetch(
    `${apiUrl}/articles/comment/delete`,
    {
      method: "DELETE",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({
        articleId: articleId,
      }),
    }
  );
  return res;
};

const followAUser = async (author: string) => {
  const res = await fetch(
    `${apiUrl}/users/following/follow`,
    {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        author,
      }),
    }
  );
  return res;
};

const unfollowAUser = async (author: string) => {
  const res = await fetch(
    `${apiUrl}/users/following/unfollow`,
    {
      method: "DELETE",
      headers: headers,
      credentials: "include",
      body: JSON.stringify({
        author,
      }),
    }
  );
  return res;
};

export {
  getAllArticles,
  getTagArticles,
  userLikeArticle,
  commentArticle,
  followAUser,
  unfollowAUser,
  editAComment,
  deleteAComment
};
