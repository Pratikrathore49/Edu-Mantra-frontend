import student from "../../assets/images/signup.png";
import logo from "../../assets/codeMantra.png";
import { useEffect, useState } from "react";
import { studentLogin, teacherLogin } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { setSelectedModel } from "../../redux/model/modelSlice";
import Loader from "../../components/Ui/Loader";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { Link, useNavigate } from "react-router";


const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const { loading ,user} = useSelector((state) => state.auth);
  const recaptchaRef = useRef(null);
  const { register, handleSubmit,formState: { errors },reset,} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role === 'student'){
   navigate('/student')
    }
    else if(user?.role === 'teacher'){
   navigate('/teacher')
    }
    
  },[user,navigate]);


  const handleLogin = async (formData) => {
    try {
      const token = recaptchaRef.current.getValue();
      if (!token) {
        alert("Please complete the CAPTCHA");
        return;
      }
      formData.recaptcha = token;
      if (isTeacher) {
        const data = await dispatch(teacherLogin(formData)).unwrap();
        console.log(data);
      } else {
        const data = await dispatch(studentLogin(formData)).unwrap();
        console.log(data);
      }
      dispatch(
        setSelectedModel({ type: "success", message: "Login Successful" })
      );
      recaptchaRef.current.reset();
      reset();
       navigate('/student')
    
    } catch (error) {
      dispatch(
        setSelectedModel({
          type: "failure",
          message: error || "Login Failed! Please try again later",
        })
      );
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section className="flex min-h-screen w-full bg-[#f6eff7] justify-center items-center px-4 py-6">
        <div className="relative flex flex-col md:flex-row bg-white shadow-xl rounded-2xl w-full sm:w-[90%] md:w-3/4 lg:w-[55%] overflow-hidden  transition-all duration-300">
          {/* toggle user button */}
          <div className="absolute  top-0 right-0  md:m-4 m-2">
            <label className="relative scale-85 sm:90  md:scale-95 lg:scale-110    float-end inline-flex items-center cursor-pointer text-purple-800 gap-2">
              <input
                onChange={() => setIsTeacher((prev) => !prev)}
                type="checkbox"
                checked={isTeacher}
                className="sr-only peer"
              />
              <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-purple-800 transition-colors duration-200"></div>
              <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
              <span className=" text-sm font-medium">Teacher</span>
            </label>
          </div>

          {/* Left Side */}
          <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8 md:p-10">
            <div className="self-center md:self-start mb-4 sm:mb-2">
              <img
                className="w-[100px] sm:w-[120px]"
                src={logo}
                alt="EduMantra Logo"
              />
            </div>

            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center md:text-left leading-snug">
              Welcome to <br className="hidden md:block" /> EduMantra Learning
              Platform
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
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-10 space-y-5 bg-white"
          >
            <div>
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-purple-200 mt-1 p-2 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="w-full  flex items-center border border-purple-200 mt-1 p-2 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full focus:outline-none md:py-1"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
                {showPassword ? (
                  <small
                    className=" text-purple-800 font-semibold cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  >
                    <EyeOff size={20} />
                  </small>
                ) : (
                  <small
                    className=" text-purple-800 font-semibold cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  >
                    <Eye size={20} />
                  </small>
                )}
              </div>
            </div>

               <ReCAPTCHA
             
               className="mt-2 ml-2"
              sitekey="6LeXEeorAAAAAAQuurb4sM_y1Cjsr0Rf2I-IMGAr"
              ref={recaptchaRef}
              />

            <button
              type="submit"
              className="w-full mt-4 bg-purple-800 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-900 transition-all duration-200 shadow-md"
            >
              {isTeacher ? "Teacher Login" : "Student Login"}
            </button>

            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-purple-800 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
