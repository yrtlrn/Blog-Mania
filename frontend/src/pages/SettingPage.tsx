import { FormEvent, useEffect, useState } from "react";
import { editSettingData, settingData } from "../api";
import { toastMsg } from "../utils/ToastMsg";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const [contentDisplay, setContentDisplay] =
    useState<string>();
  const [accountVisibility, setAccountVisibility] =
    useState<string>();
  const [hideFollowers, setHideFollowers] =
    useState<string>();
  const [hideFollowing, setHideFollowing] =
    useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (!contentDisplay || !accountVisibility) {
      toastMsg("error", "All values are required");
      setIsLoading(false);
      return;
    }
    const response = await editSettingData(
      contentDisplay,
      accountVisibility,
      hideFollowers!,
      hideFollowing!
    );
    const resBody = await response.json();
    if (!response.ok) {
      toastMsg("error", resBody.message);
      setIsLoading(false);
      return;
    } else {
      toastMsg("success", "Setting Changed");
      setIsLoading(false);
      navigate(0);
      return;
    }
  };

  const getSettingData = async () => {
    const response = await settingData();
    const resBody = await response.json();
    setContentDisplay(resBody.data.contentDisplay);
    setAccountVisibility(resBody.data.accountVisibility);
    setHideFollowers(resBody.data.hideFollowers);
    setHideFollowing(resBody.data.hideFollowing);
  };

  useEffect(() => {
    getSettingData();
  }, []);

  return (
    <form
      className="flex flex-col items-center w-full gap-5 p-3 absCenter "
      onSubmit={(e) => onSubmit(e)}
    >
      {/* Heading */}
      <h1 className="font-bold text-center text-r-5xl">
        Settings
      </h1>
      {/* Set Content Display */}
      <label className="flex items-center justify-center gap-4">
        <span className="flex items-center justify-center text-r-2xl">
          Set Content Display
        </span>
        <select
          className="h-10 border-b-2 text-r-xl w-fit"
          value={contentDisplay}
          onChange={(e) =>
            setContentDisplay(e.target.value)
          }
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </label>
      {/* Set Account Visibility */}
      <label className="flex items-center justify-center gap-4">
        <span className="flex items-center justify-center text-r-2xl">
          Set Account Visibility
        </span>
        <select
          className="h-10 border-b-2 text-r-xl w-fit"
          value={accountVisibility}
          onChange={(e) =>
            setAccountVisibility(e.target.value)
          }
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </label>
      {/* Hide Followers */}
      <label className="flex items-center justify-center gap-4">
        <span className="flex items-center justify-center text-r-2xl">
          Hide Followers
        </span>
        <select
          className="h-10 border-b-2 text-r-xl w-fit"
          value={hideFollowers}
          onChange={(e) => setHideFollowers(e.target.value)}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </label>
      {/* Hide Following */}
      <label className="flex items-center justify-center gap-4">
        <span className="flex items-center justify-center text-r-2xl">
          Hide Following
        </span>
        <select
          className="h-10 border-b-2 text-r-xl w-fit"
          value={hideFollowing}
          onChange={(e) => setHideFollowing(e.target.value)}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </label>

      {/* Save Change Buttons */}
      <button
        className="btn w-[50%] md:w-[70%] lg:w-[60%] text-center"
        type="submit"
        disabled={isLoading}
      >
        Save Changes
      </button>
    </form>
  );
};
export default SettingPage;
