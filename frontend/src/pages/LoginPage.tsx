// Package Imports
import { useForm } from "react-hook-form";

// Types Imports
import { loginPageProps } from "../@types/index";

// Utils Imports
import { toastMsg } from "../utils/ToastMsg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useEffect, useState } from "react";
import { useMainContext } from "../context/mainContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginPageProps>();

  const navigate = useNavigate();

  const { userAuthFun, isAuth } = useMainContext();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: loginPageProps) => {
    setIsLoading(true);
    const validEmail = String(data.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!validEmail) {
      toastMsg("error", "Please enter a valid email");
      setIsLoading(false);
      return;
    }
    const res = await loginUser(data);
    const resBody = await res.json();
    if (!res.ok) {
      toastMsg("error", resBody.message);
      setIsLoading(false);
    } else {
      navigate("/");
      setIsLoading(false);
      userAuthFun();
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
    
  }, [isAuth]);
  
  return (
    <form
      className="flex flex-col gap-3 absCenter  w-[80%] md:w-[70%] lg:w-[60%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-center text-r-5xl">
        Login
      </h1>
      <label className="flex flex-col gap-2">
        <span className="text-r-2xl">Email</span>
        <input
          type="email"
          required
          className="w-full h-10 p-2 rounded-md text-r-xl"
          {...register("email", {
            minLength: 5,
            required: {
              value: true,
              message: "Please enter a email",
            },
          })}
        />
        {errors.email && (
          <span className="errorText">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-r-2xl">Password</span>
        <input
          type="password"
          required
          className="w-full h-10 p-2 rounded-md text-r-xl"
          {...register("password", {
            required: {
              value: true,
              message: "Please enter your password",
            },
            minLength: {
              value: 6,
              message:
                "Password must be more than 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="errorText">
            {errors.password.message}
          </span>
        )}
      </label>
      <div className="flex justify-center gap-2">
        <input
          type="checkbox"
          className="w-5"
          {...register("remember")}
        />
        <p>Remember Me</p>
      </div>
      <button className="btn " type="submit" disabled={isLoading} >
        {!isLoading ? (
          "Log In"
        ) : (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></div>
            <p className="font-semibold text-center text-r-2xl">
              Logging In...
            </p>
          </div>
        )}
      </button>

      <span className="text-center text-r-lg">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-800 hover:underline"
        >
          Create An Account
        </Link>
      </span>
    </form>
  );
};
export default LoginPage;
