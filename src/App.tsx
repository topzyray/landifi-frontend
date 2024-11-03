import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div>
        <Header />
        <main className="w-full min-h-screen flex flex-col justify-between">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
