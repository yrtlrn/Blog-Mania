const apiUrl = "http://localhost:3000/api/v1/users";

const getFollowingList = async () => {
  const res = await fetch(`${apiUrl}/following`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

const getFollowersList = async () => {
  const res = await fetch(`${apiUrl}/followers`, {
    method: "GET",
    credentials: "include",
  });
  return res;
};

export { getFollowersList, getFollowingList };
