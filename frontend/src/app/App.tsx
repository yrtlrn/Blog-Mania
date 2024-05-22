// Components Imports
import NavBarBottom from "../components/NavBarBottom";
import NavBarTop from "../components/NavBarTop";
import HomePage from "../pages/HomePage";

function App() {
  return (
    <section className="flex flex-col min-h-screen show">
      <section className="flex-none">
        <NavBarTop />
      </section>
      <main className="flex-1 px-4">
        <HomePage />
      </main>
      <section className="flex-none md:hidden md:invisible">
        <NavBarBottom />
      </section>
    </section>
  );
}

export default App;