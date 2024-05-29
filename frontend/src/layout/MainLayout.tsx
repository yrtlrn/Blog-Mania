import { Outlet } from "react-router-dom";
import NavBarBottom from "../components/NavBarBottom";
import NavBarTop from "../components/NavBarTop";

const MainLayout = () => {
  return (
    <section className="flex flex-col min-h-screen bg-blue-300">
      <section className="flex-none">
        <NavBarTop />
      </section>

      <main className="flex-1 px-2 md:px-10 lg:px-16">
        <Outlet />
      </main>
      <div className="h-[65px] md:h-0"></div>
      <section className="fixed flex-none w-full -bottom-1 md:hidden md:invisible">
        <NavBarBottom />
      </section>
    </section>
  );
}
export default MainLayout