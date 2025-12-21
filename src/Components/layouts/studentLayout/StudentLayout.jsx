import  { useEffect } from "react";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const StudentLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.role === "teacher") {
      navigate("/teacher");
    }
  }, [user,navigate]);
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
