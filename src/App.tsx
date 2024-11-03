import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FaArrowAltCircleUp, FaQuestionCircle } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";

function App() {
  const [toggleChat, setToggleChat] = useState(false);

  return (
    <>
      <div className="">
        <Header />
        <main className="w-full min-h-screen flex flex-col justify-between">
          <Outlet />
        </main>
        <div className="fixed right-2 bottom-4 flex flex-col gap-2">
          <FaQuestionCircle
            onClick={() => setToggleChat(true)}
            className="text-[2.7rem] text-green-600 border-2 rounded-full shadow-2xl bg-white cursor-pointer transition-all ease-in-out duration-500 hover:scale-125 hover:animate-pulse"
          />
          <FaArrowAltCircleUp
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="text-[2.7rem] text-orange-600 border-2 rounded-full shadow-2xl bg-white cursor-pointer transition-all ease-in-out duration-500 hover:scale-125 hover:animate-pulse"
          />
        </div>
        {toggleChat && (
          <div className="fixed right-2 bottom-16 flex flex-col gap-2 bg-white px-4 py-4 rounded shadow-lg border">
            <div className="">
              <form className="flex flex-col gap-4">
                <p className="font-medium text-xl text-center">Chat with us</p>
                <input type="text" className="input" placeholder="Name" />
                <input type="text" className="input" placeholder="Email" />
                <input type="text" className="input" placeholder="Phone" />
                <textarea rows={4} className="input" placeholder="Message" />
                <button className="btn btn-primary">Submit</button>
                <span className="flex justify-center items-center">
                  <IoCloseCircleOutline
                    onClick={() => setToggleChat(false)}
                    className="text-center text-red-700 text-3xl hover hover:bg-red-600 hover:text-white rounded cursor-pointer transition-all ease-in-out duration-500 hover:scale-125"
                  />
                </span>
              </form>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
