import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { userAuth } from "../api";

type ContextType = {
  isAuth: boolean;
  userAuthFun: () => void;
  username: string;
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

  const userAuthFun = async () => {
    const isAuth = await userAuth();

    if (isAuth.ok) {
      setIsAuth(true);
      const res = await isAuth.json();
      setUsername(res.data);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    userAuthFun();
  }, []);

  return (
    <MainContext.Provider
      value={{ isAuth, userAuthFun, username }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  return context as ContextType;
};
