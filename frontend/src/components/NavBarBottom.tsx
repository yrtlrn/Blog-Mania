const NavBarBottom = () => {
  return (
    <section className="flex justify-around px-4 py-2 bg-orange-400 ">
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
  );
};
export default NavBarBottom;
