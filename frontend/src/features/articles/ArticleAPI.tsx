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

const getAllArticles = async () => {
  const res = await fetch(`${apiUrl}/articles`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error fetching data")
  }

  const resbody: { data: Array<articleType> } =
    await res.json();

  return resbody.data;
};

export { getAllArticles };
