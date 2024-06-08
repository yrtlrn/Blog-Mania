import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { settingData, userAuth } from "../api";

type ContextType = {
  isAuth: boolean;
  userAuthFun: () => void;
  username: string;
  contentDisplay: string;
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

  useEffect(() => {
    userAuthFun();
  }, []);

  useEffect(() => {
    if (isAuth) {
      getSettingData()
    }
  }, [isAuth]);

  return (
    <MainContext.Provider
      value={{
        isAuth,
        userAuthFun,
        username,
        contentDisplay,
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
