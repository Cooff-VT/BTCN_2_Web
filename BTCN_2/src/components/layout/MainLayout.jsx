import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans max-w-[1200px] mx-auto shadow-2xl border-x">
      <Header />
      <NavBar />
      <main className="flex-grow w-full px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;