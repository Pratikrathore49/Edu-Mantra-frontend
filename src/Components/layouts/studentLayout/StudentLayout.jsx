import React from "react";
import Header from "../Header";
import { Outlet } from "react-router";
import Footer from "../Footer";

const StudentLayout = () => {
  return (
    <>
      <div className="bg-[#f6eff7]">
        <Header />
        <main className="px-36 ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default StudentLayout;
