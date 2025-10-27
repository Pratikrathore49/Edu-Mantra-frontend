import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {  updateQuestionAsync } from "../../redux/question/questionSlice";
import { setSelectedModel } from "../../redux/model/modelSlice";
const UpdateQuestion = ({ setIsQuestionEdit, isQuestionEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: isQuestionEdit?.data || {} });

  useEffect(() => {
    if (isQuestionEdit?.isOpen && isQuestionEdit?.data) {
      reset(isQuestionEdit.data);
    }
  }, [isQuestionEdit, reset]);
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    try {
      await dispatch(updateQuestionAsync(data)).unwrap();
      dispatch(
        setSelectedModel({
          type: "success",
          message: "Question upted Successfully",
        })
      );
     
      reset();
    } catch (error) {
      console.log(error);
      dispatch(setSelectedModel({ type: "failure", message: error }));
    }
  };

  return (
    <div onClick={()=>setIsQuestionEdit({isOpen:false,data:null})} className="  inset-0 fixed flex w-full h-full bg-black/50 justify-center items-center px-4">
      <form
      onClick={(e)=>e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl px-6 border border-gray-200 rounded-xl space-y-4 py-6 w-full max-w-4xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Update Question
        </h2>

        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              {...register("question", { required: "Name is required" })}
              type="text"
              name="question"
              className="p-3 border border-gray-300 rounded-md w-full outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
              placeholder="Enter your question"
            />
            {errors.question && (
              <p className="text-red-500 text-sm">{errors.question.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">Type</label>
            <select
              {...register("type", { required: "Name is required" })}
              name="type"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
            >
              <option value="">--select--</option>
              <option value="option">option</option>
              <option value="input">input</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
        </div>

        {/* Options */}
        {watch("type") === "option" && (
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Options
            </label>
            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="flex-1 space-y-2">
                <input
                  {...register("option1", { required: "Option1 is required" })}
                  type="text"
                  name="option1"
                  className="w-full p-3 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
                  placeholder="Option 1"
                />
                <input
                  {...register("option2", { required: "Option2 is required" })}
                  type="text"
                  name="option2"
                  className="w-full p-3 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
                  placeholder="Option 2"
                />
              </div>
              <div className="flex-1 space-y-2">
                <input
                  {...register("option3", { required: "Option3 is required" })}
                  type="text"
                  name="option3"
                  className="w-full p-3 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
                  placeholder="Option 3"
                />
                <input
                  {...register("option4", { required: "Option4 is required" })}
                  type="text"
                  name="option4"
                  className="w-full p-3 border rounded-md  border-gray-300 outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
                  placeholder="Option 4"
                />
              </div>
            </div>
            {(errors.option1 || errors.option2) && (
              <p className="text-red-500 text-sm">
                At least 2 options required
              </p>
            )}
          </div>
        )}

        {/* Answer + Figure */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Answer
            </label>

            {watch("type") === "option" ? (
              <select
                {...register("answer", { required: "Answer is required" })}
                name="answer"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 border-gray-300 focus:ring-purple-700 focus:border-2"
                placeholder="Correct Answer"
              >
                <option value="">--Select Correct Answer--</option>

                <option value={watch("option1")}>{watch("option1")}</option>

                <option value={watch("option2")}>{watch("option2")}</option>

                <option value={watch("option3")}>{watch("option3")}</option>

                <option value={watch("option4")}>{watch("option4")}</option>
              </select>
            ) : (
              <input
                {...register("answer", { required: "Answer is required" })}
                type="text"
                name="answer"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 border-gray-300 focus:ring-purple-700 focus:border-2"
                placeholder="Correct Answer"
              />
            )}

            {errors.answer && (
              <p className="text-sm text-red-500">{errors.answer.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Figure
            </label>

            <input
              {...register("figure")}
              type="file"
              name="figure"
              className="w-full p-3 border  border-gray-300 rounded-md bg-white outline-none file:mr-2 file:py-1 file:px-3 file:border-0 file:rounded-md file:bg-purple-800 file:text-white focus-within:ring-purple-700  focus:ring-2 hover:file:bg-purple-800"
            />
          </div>
        </div>

        {/* Subject + Level */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              {...register("subject", { required: "Subject is required" })}
              type="text"
              name="subject"
              className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-purple-700  border-gray-300 focus:border-2"
              placeholder="Enter subject"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              {...register("level", { required: "Level is required" })}
              name="level"
              className="w-full p-3 border rounded-md outline-none focus:ring-2 border-gray-300 focus:ring-purple-700 focus:border-2"
            >
              <option value="low">Easy</option>
              <option value="mid">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.level && (
              <p className="text-red-500 text-sm">{errors.level.message}</p>
            )}
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Note</label>
          <textarea
            {...register("note")}
            name="note"
            rows="3"
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-purple-700  border-gray-300 focus:border-2"
            placeholder="Explanation / Note"
          ></textarea>
        </div>


      <div className="flex gap-12 px-8 text-lg">
        {/* Submit */}
        <button
          onClick={()=>setIsQuestionEdit({isOpen:false,data:null})}
          className="px-4 py-2 mt-3 transition-transform duration-150 hover:scale-[0.98] bg-red-600 mx-auto block w-full text-white rounded-md hover:bg-900 font-semibold"
        >
           close
        </button>
        <button
          type="submit"
          className="px-4 py-2 mt-3 transition-transform  font-semibold   duration-150 hover:scale-[0.98] bg-purple-800 mx-auto block w-full text-white rounded-md hover:bg-900"
        >
          Add Question
        </button>

        </div>
      </form>
    </div>
  );
};

export default UpdateQuestion;
