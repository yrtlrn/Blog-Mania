const NavBarTop = () => {
  return (
    <nav className="flex justify-between px-4 py-2 bg-orange-400">
      <div className="flex-i-center">
        <img
          src="../../public/assets/BlogManiaLogo.png"
          width={40}
          height={40}
        />
        <h1 className="font-bold text-r-xl">Blog Mania</h1>
      </div>

      <section className="invisible w-[70%] md:visible  flex items-center md:justify-around lg:justify-end lg:gap-10">
        <button>
          <img
            src="../../public/assets/home.png"
            width={40}
            height={40}
          />
        </button>
        <button>
          <img
            src="../../public/assets/create.png"
            width={40}
            height={40}
          />
        </button>
        <button>
          <img
            className="font-bold"
            src="../../public/assets/following.png"
            width={40}
            height={40}
          />
        </button>
      </section>

      <button className="flex flex-col justify-center gap-1">
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
      </button>
    </nav>
  );
};
export default NavBarTop;
