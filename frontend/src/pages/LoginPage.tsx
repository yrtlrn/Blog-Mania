// Package Imports
import { useForm } from "react-hook-form";

// Types Imports
import { loginPageProps } from "../types/index";

// Utils Imports
import { toastMsg } from "../utils/ToastMsg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginPageProps>();

  const navigate = useNavigate()

  const onSubmit = async (data: loginPageProps) => {
    const validEmail = String(data.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!validEmail) {
      toastMsg("error", "Please enter a valid email");
      return;
    }
    const res = await loginUser(data);
     const resBody = await res.json();
     if (!res.ok) {
        toastMsg("error", resBody.message)
     } else {
      navigate("/")
     }
  };

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
      <button className="btn" type="submit">
        Log In
      </button>
      <span className="text-center text-r-lg">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-800 hover:underline">
          Create An Account
        </Link>
      </span>
    </form>
  );
};
export default LoginPage;
