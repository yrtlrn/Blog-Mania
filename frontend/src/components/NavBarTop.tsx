import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMainContext } from "../context/mainContext";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "../api";
import { toastMsg } from "../utils/ToastMsg";

const NavBarTop = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuth, userAuthFun,username } = useMainContext();
  const navigate = useNavigate();

  // Nav Button Variants
  const topBarVariants = {
    open: {
      rotate: 45,
      translateY: 2,
      y: 10,
    },
    closed: { rotate: 0, tanslateY: 0 },
  };
  const middleBarVariants = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  };
  const bottomBarVariants = {
    open: {
      rotate: -45,
      translateY: -2,
      y: -6,
    },
    closed: { rotate: 0, translateY: 0 },
  };

  // Dropdown Variants
  const dropdownVariants = {
    open: {
      opacity: 1,
      width: "100%",
      height: "auto",
    },
    closed: {
      opacity: 0,
      width: "0%",
      height: "0%",
    },
    exit: {
      width: "0%",
      height: "0%",
      opacity: 0,
    },
  };

  const linkVariants = {
    open: {
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
    closed: {
      opacity: 0,
    },
    exit: {
      opacity: 0,
      transition: {
        delay: -0.2,
      },
    },
  };


  // Logout user function
  const logoutFun = async () => {
    const response = await logoutUser();
    if (!response.ok) {
      toastMsg("error", "Error Logging Out");
    } else {
      toastMsg("success", "Logged Out");
      userAuthFun();
      navigate(0)
      navigate("/");
    }
  };

  return (
    <nav className="relative flex items-center justify-between px-4 py-2 bg-orange-400 md:px-6">
      <section>
        <Link className="flex-i-center" to={"/"}>
          <img
            src="/assets/BlogManiaLogo.png"
            width={40}
            height={40}
          />
          <h1 className="font-bold text-r-xl">
            Blog Mania
          </h1>
        </Link>
      </section>

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
        <motion.div
          animate={showDropdown ? "open" : "closed"}
          variants={topBarVariants}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="w-10 h-[6px]  bg-black rounded-md"
        ></motion.div>
        <motion.div
          animate={showDropdown ? "open" : "closed"}
          variants={middleBarVariants}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="w-10 h-[6px]  bg-black rounded-md"
        ></motion.div>
        <motion.div
          animate={showDropdown ? "open" : "closed"}
          variants={bottomBarVariants}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="w-10 h-[6px]  bg-black rounded-md"
        ></motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && (
          <motion.section
            className="absolute w-full h-fit grid grid-cols-2 bg-red-300 top-[100%] right-0 text-center py-2 overflow-hidden"
            initial="closed"
            animate="open"
            exit="exit"
            variants={dropdownVariants}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="exit"
              variants={linkVariants}
              className="flex flex-col gap-2"
            >
              <Link
                to={"/articles/games"}
                className="font-semibold text-r-xl hover:underline "
                onClick={() => setShowDropdown(false)}
              >
                Games
              </Link>
              <Link
                to={"/articles/movie"}
                className="font-semibold text-r-xl hover:underline "
                onClick={() => setShowDropdown(false)}
              >
                Movie
              </Link>
              <Link
                to={"/articles/music"}
                className="font-semibold text-r-xl hover:underline "
                onClick={() => setShowDropdown(false)}
              >
                Music
              </Link>
              <Link
                to={"/articles/tech"}
                className="font-semibold text-r-xl hover:underline "
                onClick={() => setShowDropdown(false)}
              >
                Tech
              </Link>
              <Link
                to={"/articles/cooking"}
                className="font-semibold text-r-xl hover:underline "
                onClick={() => setShowDropdown(false)}
              >
                Cooking
              </Link>
              <Link
                to={"/articles/other"}
                className="font-semibold text-r-xl hover:underline "
                onClick={() => setShowDropdown(false)}
              >
                Others
              </Link>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2"
              initial="closed"
              animate="open"
              exit="exit"
              variants={linkVariants}
            >
              {isAuth ? (
                <>
                  <Link
                    to={`/users/profile/${username}`}
                    className="font-semibold text-r-xl hover:underline"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to={"/user/savedArticles"}
                    className="font-semibold text-r-xl hover:underline"
                    onClick={() => setShowDropdown(false)}
                  >
                    Saved Articles
                  </Link>
                  <Link
                    to={"/user/account"}
                    className="font-semibold text-r-xl hover:underline"
                    onClick={() => setShowDropdown(false)}
                  >
                    Account
                  </Link>
                  <Link
                    to={"/user/setting"}
                    className="font-semibold text-r-xl hover:underline "
                    onClick={() => setShowDropdown(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    to={"#"}
                    className="font-semibold text-r-xl hover:underline "
                    onClick={() => {
                      setShowDropdown(false);
                      logoutFun();
                    }}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="font-semibold text-r-xl hover:underline "
                    onClick={() => setShowDropdown(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to={"/signup"}
                    className="font-semibold text-r-xl hover:underline "
                    onClick={() => setShowDropdown(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default NavBarTop;
