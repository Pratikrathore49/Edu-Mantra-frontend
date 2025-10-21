import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addPaperAsync } from "../../redux/paper/paperSlice";
import { fetchQuestionsAsync } from "../../redux/question/questionSlice";
import PaperViewStructure from "./PaperViewStructure";
import { FaImage } from "react-icons/fa";
import { setSelectedModel } from "../../redux/model/modelSlice";

const AddPaper = () => {
  const [page, setPage] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);
  const [cachedQuestions, setCachedQuestions] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const watchAllFields = watch();

  const totalPages = useSelector(
    (state) => state.question.allQuestions?.totalPages
  );

  const limit = 10;

  useEffect(() => {
    if (!cachedQuestions[page]) {
      dispatch(fetchQuestionsAsync({ skip: page * limit, limit })).then(
        (res) => {
          if (res?.payload?.questions) {
            setCachedQuestions((prev) => ({
              ...prev,
              [page]: res.payload.questions,
            }));
          }
        }
      );
    }
  }, [page, dispatch, cachedQuestions]);

  useEffect(() => {
    const merged = Object.values(cachedQuestions).flat();
    setQuestionsList(merged);
  }, [cachedQuestions]);

  const addPaperFunction = async (data) => {
    try {
      setLoading(true);
      await dispatch(addPaperAsync(data)).unwrap();
      dispatch(
        setSelectedModel({
          type: "success",
          message: "Paper Successfully Added",
        })
      );
      setLoading(false);
      setSelectedQuestions("");
      reset();
    } catch (error) {
      console.log(error);
      dispatch(
        setSelectedModel({ type: "failure", message: "Paper Noted Added" })
      );
    }
  };

  return (
    <>
      <section className="flex justify-between   min-h-screen">
        <div className="py-8  px-8 flex-1  max-w-5xl   bg-white ">
          <h2 className="text-3xl uppercase tracking-wide font-bold text-center mb-8 text-gray-800">
            📘 Add New Paper
          </h2>

          <form onSubmit={handleSubmit(addPaperFunction)} className="space-y-4">
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

            {/* 🔹 Questions List */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700">
                Select Questions
              </label>
              <div className="grid grid-cols-1  gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-md overflow-y-auto">
                <Controller
                  control={control}
                  name="question"
                  defaultValue={[]}
                  render={({ field }) => (
                    <>
                      <div className=" border-b-2 pb-4">
                        {/* Pagination Controls */}
                        <div className=" flex items-center gap-4 ">
                          <button
                            type="button"
                            onClick={() =>
                              setPage((prev) => Math.max(prev - 1, 0))
                            }
                            disabled={page === 0}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ◀ Previous
                          </button>
                          <span className="text-lg font-semibold text-purple-800">
                            Page {page + 1}/{totalPages}
                          </span>
                          <button
                            type="button"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page === totalPages - 1}
                            className="px-4 py-2 bg-purple-700  disabled:opacity-50  disabled:cursor-not-allowed hover:bg-purple-800 text-white rounded-lg transition "
                          >
                            Next ▶
                          </button>
                        </div>
                      </div>

                      {questionsList.length === 0 && (
                        <p className="text-sm text-gray-500 col-span-2">
                          Loading questions...
                        </p>
                      )}
                      {cachedQuestions[page]?.map((q) => {
                        const isChecked = selectedQuestions.includes(q._id);
                        return (
                          <label
                            key={q._id}
                            className={`flex items-center border border-gray-300 space-x-4 p-4 rounded-md cursor-pointer transition ${
                              isChecked
                                ? "bg-purple-50 border border-purple-300"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                let updated;
                                if (e.target.checked) {
                                  updated = [...selectedQuestions, q._id];
                                } else {
                                  updated = selectedQuestions.filter(
                                    (id) => id !== q._id
                                  );
                                }
                                setSelectedQuestions(updated);
                                field.onChange(updated); //sync  with react-hook-form
                              }}
                              className="accent-purple-600 min-w-7 min-h-7 "
                            />
                            {q.figure && (
                              <FaImage className="text-purple-800  min-w-7 min-h-7" />
                            )}
                            <span className="text-gray-700 text-lg font-semibold">
                              {q.question}
                            </span>
                          </label>
                        );
                      })}
                    </>
                  )}
                />
              </div>
            </div>

            {/* 🔹 Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 text-white font-semibold px-8 py-2.5 rounded-lg shadow-md transition-all duration-200"
              >
                {loading ? "Adding..." : "Add Paper"}
              </button>
            </div>
          </form>
        </div>

        <div className=" w-2  border-none bg-gradient-to-b  from-purple-200 via-purple-800 to-purple-2 "></div>

        <div className=" flex-1 px-2  ">
          <PaperViewStructure
            data={watchAllFields}
            questionsList={questionsList}
            selectedQuestions={selectedQuestions}
          />
        </div>
      </section>
    </>
  );
};

export default AddPaper;
