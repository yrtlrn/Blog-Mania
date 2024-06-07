import { useForm } from "react-hook-form";
import { profilePageProps } from "../@types";
import { useEffect, useState } from "react";
import { editProfile, profileData } from "../api";
import { toastMsg } from "../utils/ToastMsg";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<profilePageProps>();

  const navigate = useNavigate();

  const getProfileData = async () => {
    const response = await profileData();
    const resBody = await response.json();
    reset(resBody);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const onSubmit = async (data: profilePageProps) => {
    const response = await editProfile(data);
    const resBody = await response.json();
    setIsLoading(true);
    if (!response.ok) {
      toastMsg("error", resBody.message);
      setIsLoading(false);
      return;
    } else {
      toastMsg("success", "Profile Edited");
      setIsLoading(false);
      navigate(0);
    }
    setIsLoading(false);
  };

  return (
    <section>
      <form
        className="flex flex-col items-center justify-center gap-3 mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Heading */}
        <h1 className="font-bold text-center text-r-5xl">
          Profile
        </h1>
        {/* First Name */}
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
        {/* Last Name */}
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
        {/* Username */}
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
        {/* Email */}
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
        {/* Current Password */}
        <label className="flex flex-col w-[80%] md:w-[70%] lg:w-[60%] gap-2">
          <span className="text-r-2xl">
            Current Password
          </span>
          <input
            type="password"
            className="w-full h-10 p-2 rounded-md text-r-xl"
            {...register("currentPassword", {
              required: {
                value: true,
                message:
                  "Password is required to edit profile",
              },
              minLength: {
                value: 6,
                message:
                  "Password must be more than 6 characters",
              },
            })}
          />
          {errors.currentPassword && (
            <span className="errorText">
              {errors.currentPassword.message}
            </span>
          )}
        </label>
        {/* New Password */}
        <label className="flex flex-col w-[80%] md:w-[70%] lg:w-[60%] gap-2">
          <span className="text-r-2xl">New Password</span>
          <input
            type="password"
            className="w-full h-10 p-2 rounded-md text-r-xl"
            {...register("newPassword", {
              minLength: {
                value: 6,
                message:
                  "Password must be more than 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <span className="errorText">
              {errors.newPassword.message}
            </span>
          )}
        </label>

        {/* Save Change Button */}
        <button
          className="btn w-[50%] md:w-[70%] lg:w-[60%] "
          type="submit"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Edit"
          ) : (
            <div className="flex items-center justify-center">
              <div
                className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              ></div>
              <p className="font-semibold text-center text-r-2xl">
                Editing...
              </p>
            </div>
          )}
        </button>
      </form>
    </section>
  );
};
export default ProfilePage;
