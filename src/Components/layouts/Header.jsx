import { Link } from "react-router";
import img from "../../assets/codeMantra.png";

import { ChevronDown, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { logoutUserAsync } from "../../redux/auth/authSlice";
import { setSelectedModel } from "../../redux/model/modelSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navItems = [
    {
      name: "Papers",
      icon: <ChevronDown size={16} strokeWidth={2.6} />,
      path: "/student/papers",
    },
    {
      name: "Courses Us",
      icon: <ChevronDown size={16} strokeWidth={2.6} />,
      path: "",
    },
    {
      name: "About Us",
      icon: <ChevronDown size={16} strokeWidth={2.6} />,
      path: "",
    },
    {
      name: "Contact Us",
      icon: <ChevronDown size={16} strokeWidth={2.6} />,
      path: "",
    },
  ];

  function logoutFun() {
    try {
      const ok = confirm("Do you Really Want to Logout"); // when you free or before production , do it by custom model popup
      if (ok) {
        dispatch(logoutUserAsync());
        setSelectedModel({
          type: "success",
          message: "User Logged Out Successfully",
        });
      }
    } catch (error) {
      console.log(error || error.message);
      setSelectedModel({ type: "failure", message: "User Logged Out Failed" });
    }
  }

  return (
    <section className="flex justify-between w-full py-3 items-center font-medium text-gray-700   px-28">
      <div className="flex gap-2">
        <div>
          <img className="w-10/12" src={img} alt="" />
        </div>
      </div>

      <div className=" md:flex gap-8 items-center hidden  ">
        <div className="flex bg-white border-gray-200  gap-1 items-center border rounded-xl ">
          <input
            className="w-[23vw] rounded-xl   focus:ring-2 focus:ring-purple-800 outline-none p-[6px] "
            type="text"
            placeholder="Search for education"
          />
          <button className="text-white h-fit py-1 hover:scale-[0.97] cursor-pointer bg-purple-600  px-3 rounded-md ">
            Search
          </button>
        </div>

        {navItems.map((item) => (
          <Link to={item.path}>
            {" "}
            <div className="flex items-center gap-1 cursor-pointer hover:text-purple-800 hover:font-semibold ">
              <p>{item.name}</p> {item.icon}
            </div>
          </Link>
        ))}
      </div>

      {user ? (
        <div className="flex items-center text-2xl text-purple-800  gap-2">
          <span onClick={logoutFun} className="cursor-pointer">
            <MdLogout />
            {/* <IoSettingsOutline />//for setting */}
          </span>
          <div className="w-9 h-9 flex justify-center items-center border-purple-800 border-2 rounded-full bg-purple-800  cursor-pointer font-semibold capitalize text-white">
            <p className="text-2xl px-1 pt-1 ">
              {user?.first_name?.slice(0, 1)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex  gap-4  items-center text-purple-800">
          <Link to={"/signup"}>
            <button className=" bg-purple-100 cursor-pointer py-1 px-4 rounded-full text-purple-800  border   hover:scale-95">
              Signup
            </button>
          </Link>

          <Link to={"/login"}>
            <button className="bg-purple-100 cursor-pointer py-1 px-5 rounded-full   border border-purple-800 hover:scale-95">
              Login
            </button>
          </Link>
          {/* <button></button> */}
          <button className="md:hidden block">
            {" "}
            <Menu />
          </button>
        </div>
      )}
    </section>
  );
};

export default Header;
