import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { settingData, userAuth } from "../api";
import { getFollowingList } from "../features/users/@UsersAPI";

type ContextType = {
  isAuth: boolean;
  userAuthFun: () => void;
  username: string;
  contentDisplay: string;
  followingUserList: string[];
  getfollowingList: () => void;
};
const MainContext = React.createContext<ContextType | null>(
  null
);

export const MainProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [contentDisplay, setContentDisplay] =
    useState("left");
  const [followingUserList, setFollowingUserList] =
    useState<string[]>([]);

  const userAuthFun = async () => {
    const response = await userAuth();
    const resBody = await response.json();

    if (!response.ok) {
      setIsAuth(false);
      console.log("Response Error");
    } else {
      setIsAuth(true);
      setUsername(resBody.data);
    }
  };

  const getSettingData = async () => {
    const response = await settingData();
    const resBody = await response.json();
    setContentDisplay(resBody.data.contentDisplay);
    return;
  };

  const getfollowingList = async () => {
    const response = await getFollowingList();
    const resBody = await response.json();
    setFollowingUserList(resBody.data);
  };

  useEffect(() => {
    userAuthFun();
  }, []);

  useEffect(() => {
    if (isAuth) {
      getSettingData();
      getfollowingList();
    }
  }, [isAuth]);

  return (
    <MainContext.Provider
      value={{
        isAuth,
        userAuthFun,
        username,
        contentDisplay,
        followingUserList,
        getfollowingList,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  return context as ContextType;
};
