import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div>
        <Header />
        <main className="bg-gray-300 w-full h-screen flex flex-col justify-between">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
