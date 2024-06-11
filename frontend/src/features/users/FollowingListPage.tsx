import { useEffect, useState } from "react";
import { getFollowingList } from "./@UsersAPI";
import { toastMsg } from "../../utils/ToastMsg";
import UsersCard from "./UsersCard";

const FollowingListPage = () => {
  const [data, setdata] = useState<string[]>([]);

  const followingList = async () => {
    const response = await getFollowingList();
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
    followingList();
  }, []);

  return (
    <section>
      {data.length <= 0 ? (
        <div>No Followings</div>
      ) : (
        <UsersCard data={data} />
      )}
    </section>
  );
};
export default FollowingListPage;
