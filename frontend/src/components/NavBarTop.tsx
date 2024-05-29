import { useState } from "react";
import { Link } from "react-router-dom";
import { useMainContext } from "../context/mainContext";

const NavBarTop = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuth } = useMainContext();
  return (
    <nav className="relative flex justify-between px-4 py-2 bg-orange-400 md:px-6">
      <div className="flex-i-center">
        <img
          src="/assets/BlogManiaLogo.png"
          width={40}
          height={40}
        />
        <h1 className="font-bold text-r-xl">Blog Mania</h1>
      </div>

      <section className="invisible w-[70%] md:visible  flex items-center md:justify-around lg:justify-end lg:gap-10">
        <button className="flex-col flex-i-center">
          <img
            src="/assets/home.png"
            width={40}
            height={40}
          />
          <aside className="text-r-base">Home</aside>
        </button>
        <button className="flex-col flex-i-center">
          <img
            src="/assets/create.png"
            width={40}
            height={40}
          />
          <aside className="text-r-base">Create</aside>
        </button>
        <button className="flex-col flex-i-center">
          <img
            className="font-bold"
            src="/assets/following.png"
            width={40}
            height={40}
          />
          <aside className="text-r-base">Following</aside>
        </button>
      </section>

      <button
        className="flex flex-col justify-center gap-1"
        type="button"
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
      >
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <section className="absolute w-full h-fit grid grid-cols-2 bg-red-300 top-[100%] left-0 text-center py-2">
          <div className="flex flex-col gap-2">
            <Link
              to={"/articles/games"}
              className="font-semibold text-r-xl hover:underline "
            >
              Games
            </Link>
            <Link
              to={"/articles/movie"}
              className="font-semibold text-r-xl hover:underline "
            >
              Movie
            </Link>
            <Link
              to={"/articles/music"}
              className="font-semibold text-r-xl hover:underline "
            >
              Music
            </Link>
            <Link
              to={"/articles/tech"}
              className="font-semibold text-r-xl hover:underline "
            >
              Tech
            </Link>
            <Link
              to={"/articles/cooking"}
              className="font-semibold text-r-xl hover:underline "
            >
              Cooking
            </Link>
            <Link
              to={"/articles/other"}
              className="font-semibold text-r-xl hover:underline "
            >
              Others
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {isAuth ? (
              <>
                <Link
                  to={"#"}
                  className="font-semibold text-r-xl hover:underline "
                >
                  Profile
                </Link>
                <Link
                  to={"#"}
                  className="font-semibold text-r-xl hover:underline "
                >
                  Settings
                </Link>
                <Link
                  to={"#"}
                  className="font-semibold text-r-xl hover:underline "
                >
                  Logoit
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"#"}
                  className="font-semibold text-r-xl hover:underline "
                >
                  Login
                </Link>
                <Link
                  to={"#"}
                  className="font-semibold text-r-xl hover:underline "
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </section>
      )}
    </nav>
  );
};
export default NavBarTop;
