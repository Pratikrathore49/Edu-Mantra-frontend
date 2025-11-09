import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStudentDetailsAsync,
  updateTeacherDetailsAsync,
} from "../../redux/user/userSlice";
import { setSelectedModel } from "../../redux/model/modelSlice";
import { updateTeacherDetailsApi } from "../../redux/apis/userApi";

const EditProfile = ({ data, setIsEditOpen }) => {
  const [isTeacher, setIsTeacher] = useState( data?.role === 'teacher');
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...data,
      date_of_birth: data?.date_of_birth
        ? new Date(data.date_of_birth).toISOString().split("T")[0]
        : "",
    },
  });
  const dispatch = useDispatch();

  async function updateUser(data) {
    try {
      if (isTeacher) {
        await dispatch(updateTeacherDetailsAsync(data)).unwrap();
      } else {
        await dispatch(updateStudentDetailsAsync(data)).unwrap();
      }
      dispatch(
        setSelectedModel({
          type: "success",
          message: "User updated successfully",
        })
      );
      setIsEditOpen(false);
      setIsTeacher(true)
      reset();
    } catch (error) {
      dispatch(
        setSelectedModel({
          type: "failure",
          message: "User updatation failed ",
        })
      );
      console.log(error);
    }
  }

  return (
    <section
      onClick={() => setIsEditOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(updateUser)}
        className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 space-y-2"
      >
        <h2 className="text-2xl font-semibold text-purple-800 text-center">
          Edit Details
        </h2>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              {...register("first_name", {
                required: "First name is required",
              })}
              id="first_name"
              className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              {...register("last_name", { required: "Last name is required" })}
              id="last_name"
              className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
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
              className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="mobile"
            >
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
              className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="date_of_birth"
            >
              Date of Birth
            </label>
            <input
              {...register("date_of_birth", {
                required: "Date of birth is required",
              })}
              id="date_of_birth"
              className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="date"
            />
            {errors.date_of_birth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.date_of_birth.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              {...register("gender")}
              id="gender"
              className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">others</option>
            </select>
          </div>
        </div>

        {/* Teacher / Student Specific */}
        {isTeacher ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
            <div>
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="years_of_experience"
              >
                Years of Experience
              </label>
              <input
                {...register("years_of_experience")}
                id="years_of_experience"
                className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                placeholder="Experience In Number"
              />
            </div>
              <div>
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="department"
                >
                  department
                </label>
                <input
                  {...register("department")}
                  id="department"
                  className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Enter student ID"
                />
              </div>
            </div>

          </>
        ) : (
          <>
            {/* Academic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="enrollment_number"
                >
                  Enrollment / Roll No.
                </label>
                <input
                  {...register("enrollment_number")}
                  id="enrollment_number"
                  className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Enter student ID"
                />
              </div>

              <div>
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="course_name"
                >
                  Course
                </label>
                <select
                  {...register("course_name")}
                  id="course_name"
                  className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="text-sm font-medium text-gray-700"
                  htmlFor="year_of_graduation"
                >
                  Year / Semester
                </label>
                <select
                  {...register("year_of_graduation")}
                  id="year_of_graduation"
                  className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="text-sm font-medium text-gray-700"
                  htmlFor="department"
                >
                  department
                </label>
                <input
                  {...register("department")}
                  id="department"
                  className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  type="text"
                  placeholder="Enter student ID"
                />
              </div>
            </div>
          </>
        )}

        {/* Address */}
        <div>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            {...register("address")}
            id="address"
            className="w-full mt-1 p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your address"
            rows="2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-purple-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 transition-all duration-200 cursor-pointer"
        >
          {isTeacher ? "Update Teacher Account" : "Update Student Account"}
        </button>
      </form>
    </section>
  );
};

export default EditProfile;
