export type articleType = {
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
  setError: Function,
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

export { getAllArticles };
