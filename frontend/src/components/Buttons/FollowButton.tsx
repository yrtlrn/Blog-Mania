import { useEffect, useState } from "react";
import {
  followAUser,
  unfollowAUser,
} from "../../features/articles/ArticleAPI";
import { toastMsg } from "../../utils/ToastMsg";
import { useMainContext } from "../../context/mainContext";

const FollowButton = ({ author }: { author: string }) => {
  // Setting FollowingUser List
  const { isAuth, followingUserList } = useMainContext();
  const [followingList, setfollowingList] = useState<
    string[]
  >([]);

  // Follow & Unfollow User
  const followUser = async () => {
    if (!isAuth) {
      toastMsg("error", "Login Required");
      return;
    }
    const response = await followAUser(author);
    const resBody = await response.json();
    if (!response.ok) {
      toastMsg("error", resBody.message);
      return;
    } else {
      toastMsg("success", `Follwing ${author}`);
      const newList = new Set([...followingList, author]);
      setfollowingList([...newList]);

      return;
    }
  };

  const unfollowUser = async () => {
    if (!isAuth) {
      toastMsg("error", "Login Required");
      return;
    }

    const response = await unfollowAUser(author);
    const resBody = await response.json();
    if (!response.ok) {
      toastMsg("error", resBody.message);
      return;
    } else {
      toastMsg("success", `Unfollowed ${author}`);
      const index = followingList.indexOf(author);

      const newList = followingList;
      newList.splice(index, 1);
      setfollowingList([...newList]);

      return;
    }
  };

  const followOrUnfollow = () => {
    if (followingList.includes(author)) {
      unfollowUser();
    } else {
      followUser();
    }
  };

  useEffect(() => {
    setfollowingList(followingUserList);
  }, [followingUserList]);

  return (
    <>
      {isAuth && followingList.length > 0 && (
        <button
          className="px-2 border-2 border-black rounded-md hover:cursor-pointer text-r-md"
          onClick={() => followOrUnfollow()}
        >
          {followingList.includes(author)
            ? "Unfollow"
            : "Follow"}
        </button>
      )}
    </>
  );
};
export default FollowButton;
