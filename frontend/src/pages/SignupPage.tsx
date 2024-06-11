// Package Imports
import { Controller, useForm } from "react-hook-form";

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
    control,
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

    let formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.firstName);
    if (data.profilePic) {
      console.log("There is a profile pic");
      formData.append("profilePic", data.profilePic[0]);
    }
    

    const res = await signupUser(formData);
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
      className="flex flex-col items-center justify-center gap-3 px-10 mb-5"
      encType="multipart/form-data"
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

      
      <Controller
        control={control}
        name={"profilePic"}
        render={({
          field: { value, onChange, ...field },
        }) => {
          return (
            <>
              <label className="flex flex-col w-[80%] md:w-[70%] lg:w-[60%] gap-2 text-center my-2">
                <span className="text-r-2xl">
                  Profile Picture
                </span>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="w-full p-2 rounded-md text-r-xl"
                  {...field}
                  value={value?.fileName}
                  onChange={(event) => {
                    onChange(event.target.files![0]);
                  }}
                />
                {errors.profilePic && (
                  <span className="errorText">
                    {errors.profilePic.message}
                  </span>
                )}
              </label>
            </>
          );
        }}
      />

      <button
        className="py-2 font-semibold bg-orange-400 rounded-md text-r-2xl hover:bg-orange-500 w-[80%] md:w-[70%] lg:w-[60%] "
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
