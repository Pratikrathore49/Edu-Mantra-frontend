import { useState } from "react";
import logo from "../../assets/codeMantra.png";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { registerStudent, registerTeacher } from "../../redux/auth/authSlice";
import { setSelectedModel } from "../../redux/model/modelSlice";
import Loader from "../../Components/Ui/Loader.jsx";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaKeySite } from "../../services/constant.js";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const recaptchaRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function handleSignup(formData) {
    const token = recaptchaRef.current.getValue();
    if (!token) {
      alert("Please complete the CAPTCHA");
      return;
    }
    formData.recaptcha = token;
    try {
      if (isTeacher) {
        const data = await dispatch(registerTeacher(formData)).unwrap();
        console.log(data);
      } else {
        const data = await dispatch(registerStudent(formData)).unwrap();
        console.log(data);
      }
      dispatch(
        setSelectedModel({
          type: "success",
          message: "Registration Successful",
        })
      );
      reset();
    } catch (error) {
      dispatch(
        setSelectedModel({
          type: "failure",
          message: error || "Registration Failed! Please try again later",
        })
      );
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
    
      {loading && <Loader />}
      <section className="flex min-h-screen w-full bg-[#f6eff7] justify-center items-center px-4 py-6">
        <div className="bg-white shadow-xl rounded-2xl w-full sm:w-[90%] md:w-3/4 lg:w-[55%] p-8 sm:p-10 space-y-6 transition-all duration-300 relative">
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
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium" htmlFor="first_name">
                  First Name
                </label>
                <input
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                  id="first_name"
                  className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Enter first name"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                  id="last_name"
                  className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Enter last name"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contact Info */}
              <div>
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="email"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="mobile">
                  Mobile Number
                </label>
                <input
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit mobile number",
                    },
                  })}
                  id="mobile"
                  className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="tel"
                  placeholder="Enter mobile number"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <div className="w-full flex items-center border border-purple-200 mt-1 p-2 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    id="password"
                    className="w-full focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                  />
                  {showPassword ? (
                    <small
                      className="text-purple-800 font-semibold cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    >
                      <EyeOff size={20} />
                    </small>
                  ) : (
                    <small
                      className="text-purple-800 font-semibold cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    >
                      <Eye size={20} />
                    </small>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="department">
                  Department / Branch
                </label>
                <input
                  {...register("department")}
                  list="branch-list"
                  id="department"
                  className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="e.g. Computer Science"
                />
                <datalist id="branch-list">
                  <option value="computer science"></option>
                  <option value="information technology"></option>
                  <option value="electrical engineering"></option>
                  <option value="mechanical engineering"></option>
                  <option value="civil engineering"></option>
                  <option value="data science"></option>
                </datalist>
              </div>
            </div>

            {isTeacher ? (
              <div>
                <label className="text-sm font-medium" htmlFor="teacher_id">
                  Teacher ID
                </label>
                <input
                  {...register("teacher_id", {
                    required: "Teacher ID is required",
                  })}
                  id="teacher_id"
                  className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Enter Teacher ID"
                />
                {errors.teacher_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.teacher_id.message}
                  </p>
                )}
              </div>
            ) : (
              <>
                {/* Academic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="enrollment_number"
                    >
                      Enrollment / Roll No.
                    </label>
                    <input
                      {...register("enrollment_number")}
                      id="enrollment_number"
                      className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      type="text"
                      placeholder="Enter student ID"
                    />
                  </div>

                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="course_name"
                    >
                      Course
                    </label>
                    <select
                      {...register("course_name")}
                      id="course_name"
                      className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    <label
                      className="text-sm font-medium"
                      htmlFor="year_of_graduation"
                    >
                      Year / Semester
                    </label>
                    <select
                      {...register("year_of_graduation")}
                      id="year_of_graduation"
                      className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="date_of_birth"
                    >
                      Date of Birth
                    </label>
                    <input
                      {...register("date_of_birth", {
                        required: "Date of birth is required",
                      })}
                      id="date_of_birth"
                      className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      type="date"
                    />
                    {errors.date_of_birth && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.date_of_birth.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Address */}
            <div>
              <label className="text-sm font-medium" htmlFor="address">
                Address
              </label>
              <textarea
                {...register("address")}
                id="address"
                className="w-full border border-purple-200 mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your address"
                rows="3"
              ></textarea>
            </div>

            <ReCAPTCHA
              className="mt-2 ml-2"
              sitekey={captchaKeySite}
              ref={recaptchaRef}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-purple-800 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-900 transition-all duration-200 shadow-md"
            >
              {isTeacher ? "Create Teacher Account" : "Create Student Account"}
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
    </>
  );
};

export default SignupForm;
