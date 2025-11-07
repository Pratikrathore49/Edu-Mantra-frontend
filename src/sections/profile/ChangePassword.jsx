import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../../services/axiosInstance";

const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        const res = await axiosInstance.patch("v2/student/change-pass",data)
        console.log('frontendres',res)
        console.log('runnning')
      if (!res.data.statusCode) {
        alert("Password change failed ❌");
        return;
      }

      alert("Password Updated Successfully ✅");
      reset();
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <section className="fixed inset-0 bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Change Password
        </h2>

        {/* OLD PASSWORD */}
        <div>
          <label className="block text-sm font-medium">Old Password</label>

          <div className="w-full flex items-center border border-purple-300 mt-1 p-2 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
            <input
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              type={showOld ? "text" : "password"}
              className="w-full focus:outline-none"
            />

            {showOld ? (
              <small
                className="text-purple-800 cursor-pointer"
                onClick={() => setShowOld(false)}
              >
                <EyeOff size={20} />
              </small>
            ) : (
              <small
                className="text-purple-800 cursor-pointer"
                onClick={() => setShowOld(true)}
              >
                <Eye size={20} />
              </small>
            )}
          </div>

          {errors.oldPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* NEW PASSWORD (NO EYE ICON) */}
        <div>
          <label className="block text-sm font-medium">New Password</label>

          <div className="w-full flex items-center border border-purple-300 mt-1 p-2 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
            <input
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              type="password"
              className="w-full focus:outline-none"
            />
          </div>

          {errors.newPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>

          <div className="w-full flex items-center border border-purple-300 mt-1 p-2 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              type={showConfirm ? "text" : "password"}
              className="w-full focus:outline-none"
            />

            {showConfirm ? (
              <small
                className="text-purple-800 cursor-pointer"
                onClick={() => setShowConfirm(false)}
              >
                <EyeOff size={20} />
              </small>
            ) : (
              <small
                className="text-purple-800 cursor-pointer"
                onClick={() => setShowConfirm(true)}
              >
                <Eye size={20} />
              </small>
            )}
          </div>

          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          disabled={isSubmitting}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg transition"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
