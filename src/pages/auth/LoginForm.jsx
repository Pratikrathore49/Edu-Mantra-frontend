
// export default LoginForm;
import student from "../../assets/images/signup.png";
import logo from "../../assets/codeMantra.png";

const LoginForm = () => {
  return (
    <section className="flex min-h-screen w-full bg-[#f6eff7] justify-center items-center px-4 py-6">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl w-full sm:w-[90%] md:w-3/4 lg:w-[55%] overflow-hidden transition-all duration-300">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8 md:p-10">
          <div className="self-center md:self-start mb-4 sm:mb-2">
            <img className="w-[100px] sm:w-[120px]" src={logo} alt="EduMantra Logo" />
          </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left leading-snug">
            Welcome to <br className="hidden md:block" /> EduMantra Learning Platform
          </p>

          <div className="mt-8 flex justify-center items-center">
            <img
              className="w-9/12 sm:w-8/12 md:w-9/12 drop-shadow-md"
              src={student}
              alt="Student Illustration"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[2px] bg-gradient-to-t from-white/70 via-black/60 to-white/70 rounded-full"></div>

        {/* Right Side (Form) */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-10 space-y-5 bg-white">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="w-full border border-gray-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full mt-4 bg-purple-800 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-900 transition-all duration-200 shadow-md">
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-800 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

