import { Outlet } from "react-router-dom";
import NavBarBottom from "../components/NavBarBottom";
import NavBarTop from "../components/NavBarTop";
import { useEffect, useState } from "react";


const MainLayout = () => {
  
  // Top Nav visible when scrolling up
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  });



  return (
    <section className="flex flex-col min-h-screen bg-blue-300">
      <section
        className={`flex-none z-[2] sticky ${
          visible && "-top-1 topNavAnimationEntry "
        }`}
      >
        <NavBarTop />
      </section>

      <main className="flex-1 px-2 md:px-10 lg:px-16">
        <Outlet />
      </main>
      <div className="h-[65px] md:h-0"></div>
      <section className="fixed flex-none w-full -bottom-1 md:hidden z-[2]md:invisible">
        <NavBarBottom />
      </section>
    </section>
  );
};
export default MainLayout;
