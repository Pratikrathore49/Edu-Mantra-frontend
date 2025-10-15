import React from "react";
import boyimg from "../../assets/images/boy-cross-fingers.png";

const HeroSection = () => {
  return (
    <section className="  w-full flex justify-center ">
      <div className=" flex flex-col md:flex-row gap-24 items-center   ">
        <div className="flex-1 flex flex-col  self-center space-y-8 items-baseline">
          <p className="capitalize text-orange-500 py-1 px-2 bg-white w-fit">
            never stop learing
          </p>
          <h1 className="text-7xl font-semibold leading-tight
          ">
            Grow up your skills by learning with Edu-Mantra
          </h1>
          <p className=" text-lg  text-gray-500">
            Student Portal – your one-stop learning hub. Access notes,
            resources, and personal details seamlessly, while teachers share
            materials and guide students for smarter education.
          </p>

        </div>

        <div className=" flex-1 justify-center flex md:flex-end ml-12 mt-20 ">
          <div className="bg-red-300 w-3/5  rounded-full   overflow-hidden">
            <img className=" w-full  " src={boyimg} alt="boy_img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
