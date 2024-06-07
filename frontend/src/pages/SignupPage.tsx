// Package Imports
import { useForm } from "react-hook-form";

// Types Imports
import { signupPageProps } from "../@types/index";

// Utils Imports
import { toastMsg } from "../utils/ToastMsg";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api";
import { useState } from "react";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupPageProps>();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: signupPageProps) => {
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
    const res = await signupUser(data);
    const resBody = await res.json();
    if (!res.ok) {
      toastMsg("error", resBody.message);
      setIsLoading(false);
    } else {
      navigate("/");
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-3 mb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-center text-r-5xl">
        Sign Up
      </h1>
      <label className="flex flex-col w-[80%] md:w-[70%] lg:w-[60%] gap-2">
        <span className="text-r-2xl">First Name</span>
        <input
          type="text"
          required
          className="h-10 p-2 rounded-md text-r-xl"
          {...register("firstName", {
            minLength: 3,
            maxLength: 20,
            required: {
              value: true,
              message: "Please enter your First Name",
            },
          })}
        />
        {errors.email && (
          <span className="errorText">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="flex flex-col w-[80%] md:w-[70%] lg:w-[60%] gap-2">
        <span className="text-r-2xl">Last Name</span>
        <input
          type="text"
          required
          className="w-full h-10 p-2 rounded-md text-r-xl"
          {...register("lastName", {
            minLength: 3,
            maxLength: 20,
            required: {
              value: true,
              message: "Please enter your Last Name",
            },
          })}
        />
        {errors.email && (
          <span className="errorText">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="flex flex-col w-[80%] md:w-[70%] lg:w-[60%] gap-2">
        <span className="text-r-2xl">Username</span>
        <input
          type="text"
          required
          className="w-full h-10 p-2 rounded-md text-r-xl"
          {...register("username", {
            minLength: 3,
            maxLength: 15,
            required: {
              value: true,
              message: "Please enter a Username",
            },
          })}
        />
        {errors.email && (
          <span className="errorText">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="flex flex-col w-[80%] md:w-[70%] lg:w-[60%] gap-2">
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
      <label className="flex flex-col w-[80%] md:w-[70%] lg:w-[60%] gap-2">
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

      <button
        className="btn w-[80%] md:w-[70%] lg:w-[60%] "
        type="submit"
        disabled={isLoading}
      >
        {!isLoading ? (
          "Sign up"
        ) : (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></div>
            <p className="font-semibold text-center text-r-2xl">
              Signing Up...
            </p>
          </div>
        )}
      </button>

      <span className="text-center text-r-lg">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-800 hover:underline"
        >
          Log In
        </Link>
      </span>
    </form>
  );
};
export default SignupPage;
