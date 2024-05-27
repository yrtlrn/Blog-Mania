// Components Imports
import NavBarBottom from "../components/NavBarBottom";
import NavBarTop from "../components/NavBarTop";

// Package Imports
import { Outlet } from "react-router-dom";

function App() {
  return (
    <section className="flex flex-col min-h-screen bg-blue-300">
      <section className="flex-none ">
        <NavBarTop />
      </section>

      <main className="flex-1 px-4">
        <Outlet />
      </main>
      <div className="h-[65px] md:h-0"></div>
      <section className="fixed flex-none w-full -bottom-1 md:hidden md:invisible">
        <NavBarBottom />
      </section>
    </section>
  );
}

export default App;
