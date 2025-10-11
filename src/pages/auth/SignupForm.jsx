import { useState } from "react";
import logo from "../../assets/codeMantra.png";
import { Eye, EyeOff } from "lucide-react";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="flex min-h-screen w-full bg-[#f6eff7] justify-center items-center px-4 py-6">
      <div className="bg-white shadow-xl rounded-2xl w-full sm:w-[90%] md:w-3/4 lg:w-[55%] p-8 sm:p-10 space-y-6 transition-all duration-300">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-4">
          <img
            className="w-[100px] sm:w-[120px]"
            src={logo}
            alt="EduMantra Logo"
          />
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 text-purple-800 text-center">
            Student Registration
          </h1>
          <p className="text-gray-500 text-sm text-center mt-2">
            Fill in the details below to create your student account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                placeholder="Enter first name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Info */}
            <div>
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="phone">
                Mobile Number
              </label>
              <input
                id="phone"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="tel"
                placeholder="Enter mobile number"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="w-full  flex items-center border border-gray-200 mt-1 p-2 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500">
              <input
                
                id="password"
                className="w-full focus:outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
              />
              {showPassword ? <small className=" text-purple-800 font-semibold cursor-pointer" onClick={() => setShowPassword(false)}><EyeOff size={20} /></small> : <small className=" text-purple-800 font-semibold cursor-pointer" onClick={() => setShowPassword(true)}><Eye size={20} /></small>}
               </div>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="date"
                required
              />
            </div>
          </div>

          {/* Academic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="studentId">
                Enrollment / Roll No.
              </label>
              <input
                id="studentId"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                placeholder="Enter student ID"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="course">
                Course
              </label>
              <select
                id="course"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="branch">
                Department / Branch
              </label>
              <input list="branch-list"
                id="branch"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                placeholder="e.g. Computer Science"
                required
              />
              <datalist  id="branch-list">
                <option value="computer science"></option>
                <option value="information technology"></option>
                <option value="electrical engineering"></option>
                <option value="mechanical engineering"></option>
                <option value="civil engineering"></option>
                <option value="data science"></option>
              </datalist>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="year">
                Year / Semester
              </label>
              <select
                id="year"
                className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your address"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button className="w-full mt-6 bg-purple-800 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-900 transition-all duration-200 shadow-md">
            Create Account
          </button>

          {/* Redirect to login */}
          <p className="text-sm text-center mt-4">
            Already registered?{" "}
            <a
              href="/login"
              className="text-purple-800 font-semibold hover:underline"
            >
              Login Here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
