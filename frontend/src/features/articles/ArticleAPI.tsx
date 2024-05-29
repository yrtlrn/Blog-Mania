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
      setError({name: "Error", message: "Something went wrong"})
    })
    .catch((error: Error) => {
      setError(error);
      return;
    });
};

export { getAllArticles, getTagArticles };
