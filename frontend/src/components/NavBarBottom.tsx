const NavBarBottom = () => {
  return (
    <section className="flex justify-around px-4 py-2 bg-orange-400">
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
  );
};
export default NavBarBottom;
