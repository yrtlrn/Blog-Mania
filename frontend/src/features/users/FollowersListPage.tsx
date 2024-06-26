import { useEffect, useState } from "react";
import { getFollowersList } from "./@UsersAPI";
import { toastMsg } from "../../utils/ToastMsg";
import UsersCard from "./UsersCard";

const FollowersListPage = () => {
  const [data, setdata] = useState<string[]>([]);

  const followersList = async () => {
    const response = await getFollowersList();
    const resBody = await response.json();
    if (!response.ok) {
      toastMsg("error", resBody.message);
      return;
    } else {
      setdata(resBody.data);
      return;
    }
  };

  useEffect(() => {
    followersList();
  }, []);

  return (
    <section>
      {data.length <= 0 ? (
        <div>No Followers</div>
      ) : (
        <UsersCard data={data} />
      )}
    </section>
  );
};
export default FollowersListPage;
