import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updatePaperAsync } from "../../redux/paper/paperSlice";
import { FaImage } from "react-icons/fa";
import { setSelectedModel } from "../../redux/model/modelSlice";

const UpdatePaper = ({ paper, updateCencelFun }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: paper });

  const updatePaperFunc = async (data) => {
    try {
      setLoading(true);
      await dispatch(updatePaperAsync(data)).unwrap();
      dispatch(
        setSelectedModel({
          type: "success",
          message: "Paper Updated Successfully",
        })
      );
      updateCencelFun()
      setLoading(false);

      reset();
    } catch (error) {
      console.log(error);
      dispatch(
        setSelectedModel({ type: "failure", message: "Paper Not Updated" })
      );
    }
  };

  return (
    <>
      <section
        onClick={updateCencelFun}
        className="flex justify-center items-center inset-0 fixed bg-black/50 z-10  "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="py-8  px-8 flex-1 max-w-3xl rounded-2xl   bg-white "
        >
          <h2 className="text-3xl uppercase tracking-wide font-bold text-center mb-8 text-gray-800">
            📘 Update Paper
          </h2>

          <form onSubmit={handleSubmit(updatePaperFunc)} className="space-y-4">
            {/* 🔹 Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Paper Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="e.g. Machine Learning Test"
                  className="w-full border-gray-300 border focus:border-purple-500 focus:ring-2 focus:ring-purple-400 rounded-lg p-2.5 outline-none transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm ">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Exam Type
                </label>
                <input
                  type="text"
                  {...register("examType")}
                  placeholder="e.g. Mid Sem"
                  className="w-full border-gray-300 border focus:border-purple-500 focus:ring-2 focus:ring-purple-400 rounded-lg p-2.5 outline-none transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  TotalMarks <span className="text-red-500">*</span>
                </label>
                <input
                  type="Number"
                  {...register("totalMarks", {
                    required: "Total marks required",
                  })}
                  placeholder="e.g.50"
                  className="w-full border-gray-300 border focus:border-purple-500 focus:ring-2 focus:ring-purple-400 rounded-lg p-2.5 outline-none transition"
                />
                {errors.totalMarks && (
                  <p className="text-sm text-red-500">
                    {errors.totalMarks.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("duration", {
                    required: "duration is required",
                  })}
                  placeholder="e.g. 90"
                  className="w-full border-gray-300  border focus:border-purple-500 focus:ring-2 focus:ring-purple-400 rounded-lg p-2.5 outline-none transition"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="e.g. Machine Learning"
                  className="w-full border-gray-300 border focus:border-purple-500 focus:ring-2 focus:ring-purple-400 rounded-lg p-2.5 outline-none transition"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* 🔹 Notes */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Note
                </label>
                <textarea
                  {...register("note")}
                  placeholder="Enter any important note..."
                  rows="1"
                  className="w-full border-gray-300 border focus:border-purple-500 focus:ring-2 focus:ring-purple-400 rounded-lg p-2.5 outline-none transition"
                ></textarea>
              </div>
            </div>

            {/* 🔹 Paid Checkbox */}
            <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg border border-purple-100">
              <input
                type="checkbox"
                {...register("isPaid")}
                id="isPaid"
                className="w-5 h-5 accent-purple-600 cursor-pointer"
              />
              <label htmlFor="isPaid" className="font-medium text-gray-700 ">
                Mark as Paid Paper
              </label>
            </div>

            {/* 🔹 Submit Button */}
            <div className="text-center pt-4 flex gap-6 ">
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 w-full text-white font-semibold px-8 py-2.5 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                onClick={updateCencelFun}
                type="button"
                className="bg-red-700 w-full hover:bg-red-800 disabled:bg-gray-400 text-white font-semibold px-8 py-2.5 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
              >
                Cencel
              </button>
            </div>
          </form>
        </div>

        <div className=" w-2  border-none bg-gradient-to-b  from-purple-200 via-purple-800 to-purple-2 "></div>
      </section>
    </>
  );
};

export default UpdatePaper;
