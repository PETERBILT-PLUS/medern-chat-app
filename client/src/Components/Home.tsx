import { ToastContainer } from "react-toastify";
import MessagesContainer from "./MessagesContainer.tsx";
import 'react-toastify/dist/ReactToastify.css';
import SideBar from "./SideBar.tsx";

function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="py-5 container flex flex-row justify-center items-center mx-auto px-5 h-full">
          <div className="flex border rounded-md h-[400px] sm:h-[450px] md:h-[550px]">
            <SideBar />
            <MessagesContainer />
          </div>
      </div>
    </section>
  )
}

export default Home;