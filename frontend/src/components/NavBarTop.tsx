const NavBarTop = () => {
  return (
    <nav className="flex justify-between px-4 py-2 bg-orange-400">
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

      <button className="flex flex-col justify-center gap-1">
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
        <div className="w-10 h-[6px] bg-black rounded-md"></div>
      </button>
    </nav>
  );
};
export default NavBarTop;
