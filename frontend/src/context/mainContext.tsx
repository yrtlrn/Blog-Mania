import React, { useState, useContext } from "react";
import { userAuth } from "../api";

type ContextType = {
  isAuth: boolean;
  userAuthFun: () => void;
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

  const userAuthFun = async () => {
    const isAuth = await userAuth();

    if (isAuth.ok) {
      setIsAuth(true);
    } else {
      setIsAuth(false)
    }
  };


  return (
    <MainContext.Provider value={{ isAuth, userAuthFun }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  return context as ContextType;
};
