import React from "react";

import student1 from "../../assets/images/footer/student1.jpeg";
import student2 from "../../assets/images/footer/student2.jpeg";
import student3 from "../../assets/images/footer/student3.jpeg";
import student4 from "../../assets/images/footer/student4.jpeg";
import student5 from "../../assets/images/footer/student5.jpg";
import student6 from "../../assets/images/footer/student6.jpeg";
import logo from "../../assets/codeMantra.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Button from "../ui/Button";

const Footer = () => {
  return (
    <section className="px-28 space-y-16 ">
      <div
        id="blackSec"
        className="flex bg-[#0d043b]  mx-12 px-6 pt-6 rounded-2xl"
      >
        <div className=" w-[8vw] flex flex-col gap-12 py-6  px-4">
          <div className="w-14 h-14  rounded-full overflow-hidden ">
            <img className="w-full" src={student1} alt="" />
          </div>
          <div className="w-14 h-14 self-end  rounded-full overflow-hidden ">
            <img className="w-full" src={student2} alt="" />
          </div>
          <div className="w-14 h-14  rounded-full overflow-hidden ">
            <img className="w-full" src={student3} alt="" />
          </div>
        </div>

        <div className="flex-1 flex items-center ">
          <div className="flex flex-col justify-center items-center gap-2 py-6 px-4 w-[60%] mx-auto ">
            <h2 className="text-[54px] leading-[1.1] font-semibold text-white text-center">
              New learning content coming soon — stay connected!
            </h2>
            <p className="text-white">
              Trusted by 20K+ learners every day — explore, learn, and grow with
              EduMantra.
            </p>
            <div className="flex gap-8 mt-6 ">
              <Button text="Learn More" className=" px-4 py-2 rounded" />

              <Button text="Get Started" className=" px-4 py-2 rounded" />
            </div>
          </div>
        </div>

        <div className=" w-[8vw] flex flex-col gap-12 py-6  px-4">
          <div className="w-14 h-14  rounded-full self-end overflow-hidden ">
            <img className="w-full" src={student4} alt="" />
          </div>
          <div className="w-14 h-14 rounded-full overflow-hidden ">
            <img className="w-full object-cover" src={student5} alt="" />
          </div>
          <div className="w-14 h-14  rounded-full self-end overflow-hidden ">
            <img className="w-full object-cover" src={student6} alt="" />
          </div>
        </div>
      </div>

      <div
        id="whiteSec"
        className="grid grid-cols-5 font-medium justify-between px-28 gap-8 text-[15px] 
       text-gray-500 pb-12 border-b border-gray-300"
      >
        <div className="space-y-2">
          <img className="w-40" src={logo} alt="logo" />
          <div className="flex gap-4 text-gray-700 pt-2 pb-4">
            <FaFacebookF size={24} />
            <FaInstagram size={24} />
            <FaTwitter size={24} />
            <FaLinkedin size={24} />
          </div>
          <p>@2026 EduMantra</p>
          <span>
            <p>EduMantra is a registered trademark.</p>
            <p>
              <a href="mailto:jipratik49@gmail.com">jipratik49@gmail.com</a>
            </p>
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-xl text-gray-700 pb-2 ">Courses</h2>
          <p>All Courses</p>
          <p>Popular Courses</p>
          <p>New Releases</p>
          <p>Special Offers</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-xl text-gray-700 pb-2">
            Community
          </h2>
          <p>Learners</p>
          <p>Partners</p>
          <p>Developers</p>
          <p> Transactions</p>
          <p>Contributors</p>
          <p>Volunteers</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-xl text-gray-700 pb-2">About Us</h2>
          <p>Our Story</p>
          <p>Careers</p>
          <p>Press</p>
          <p>Blog</p>
          <p>Contact Us</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-xl text-gray-700 pb-2">Support</h2>
          <p>Help Center</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
