import { Navigate, Outlet } from "react-router-dom";
import { useMainContext } from "../context/mainContext";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const { isAuth,userAuthFun } = useMainContext();
  const [timeLeft, setTimeLeft] = useState(5);

  

  const timer = () => {
    const countdown = setInterval(function () {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);
    if (timeLeft === 0) {
      clearInterval(countdown);
    }
  };

  useEffect(() => {
    timer();
    userAuthFun()
  }, []);

  return (
    <>
      {isAuth ? (
        <Outlet />
      ) : (
        <div className="text-center">
          <h1 className="my-2 text-r-2xl">Unauthorized</h1>
          <p className="text-r-xl">
            You will be redirected to the Home Page in ...
            {timeLeft} Seconds
          </p>
          {timeLeft === 0 && <Navigate to={"/"} />}
        </div>
      )}
    </>
  );
};
export default AuthLayout;
