import { useEffect, useState } from "react";
import { getFollowersList } from "./@UsersAPI";
import { toastMsg } from "../../utils/ToastMsg";

const FollowersListPage = () => {

  const [data, setdata] = useState();
    

  const followersList = async () => {
    const response = await getFollowersList();
    const resBody = await response.json()
    if (!response.ok) {
      toastMsg("error", resBody.message)
      return
    } else {
      console.log(resBody)
      return
    }
  }

  useEffect(() => {
    followersList()
  }, []);

  return (
    <section>FollowersListPage</section>
  )
}
export default FollowersListPage