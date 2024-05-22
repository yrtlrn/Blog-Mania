const apiUrl = "http://localhost:3000/api/v1";

const getAllArticles = async () => {
  const res = await fetch(`${apiUrl}/articles`, {
    method: "GET",
  });

  if (!res.ok) {
    console.log("Error Occured when fetching data");
  }

  const resbody = await res.json();

  return resbody;
};




export {
    getAllArticles
}