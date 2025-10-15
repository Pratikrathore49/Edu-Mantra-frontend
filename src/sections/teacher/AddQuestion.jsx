import  { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addQuestionAsync } from "../../redux/question/questionSlice";

const AddQuestion = () => {
  const [type, setType] = useState("");
  const {register,handleSubmit ,reset , formState:{errors} } = useForm();
  
  const dispatch = useDispatch()
  const onSubmit = (data) =>{
    dispatch(addQuestionAsync(data))
    console.log("dispatch running")
    reset();
    setType("");
  }
  
  return (

    <div className=" flex w-full h-full bg-gray-50 justify-center items-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl px-6 border border-gray-200 rounded-xl space-y-4 py-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Add Question
        </h2>     

      
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Question
            </label>
            <input 
            {...register("question",{required:"Name is required"})}


              type="text"
              name="question"
              className="p-3 border border-gray-300 rounded-md w-full outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
              placeholder="Enter your question"
            />
            {errors.question && (<p className="text-red-500 text-sm">{errors.question.message}</p>)}
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">Type</label>
            <select
              {...register("type",{required:"Name is required"})}
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="type"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
            >
              <option value=" ">--select--</option>
              <option value="option">option</option>
              <option value="input">input</option>
            </select>
                        {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
        </div>

        {/* Options */}
        {type === "option" && 
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Options
            </label>
            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="flex-1 space-y-2">
                <input
                {...register("option1",{required:"Option1 is required"})}
                  type="text"
                  name="option1"
                  className="w-full p-3 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
                  placeholder="Option 1"
                />
                <input
                {...register("option2",{required:"Option2 is required"})}
                  type="text"
                  name="option2"
                  className="w-full p-3 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
                  placeholder="Option 2"
                />
              </div>
              <div className="flex-1 space-y-2">
                <input
                {...register("option3",{required:"Option3 is required"})}
                  type="text"
                  name="option3"
                  className="w-full p-3 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
                  placeholder="Option 3"
                />
                <input
                {...register("option4",{required:"Option4 is required"})}
                  type="text"
                  name="option4"
                  className="w-full p-3 border rounded-md  border-gray-300 outline-none focus:ring-2 focus:ring-purple-700 focus:border-2"
                  placeholder="Option 4"
                />
             
              </div>
            </div>
            {(errors.option1 || errors.option2)&&(
              <p className="text-red-500 text-sm">At least 2 options required</p>
            )}
          </div>
        }

        {/* Answer + Figure */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Answer
            </label>
            <input
            {...register("answer",{required:"Answer is required"})}
              type="text"
              name="answer"
              className="w-full p-3 border rounded-md outline-none focus:ring-2 border-gray-300 focus:ring-purple-700 focus:border-2"
              placeholder="Correct Answer"
            />
            {errors.answer &&(
              <p className="text-sm text-red-500">{errors.answer.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Figure
            </label>
         
            <input    {...register("figure")}
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
            {...register("subject",{required:"Subject is required"})}
              type="text"
              name="subject"
              className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-purple-700  border-gray-300 focus:border-2"
              placeholder="Enter subject"
            />
            {errors.subject &&(<p className="text-red-500 text-sm">{errors.subject.message}</p>)}
          </div>
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Level
            </label>
            <select
              {...register("level",{required: "Level is required"})}
              name="level"
              className="w-full p-3 border rounded-md outline-none focus:ring-2 border-gray-300 focus:ring-purple-700 focus:border-2"
            >
              <option value="low">Easy</option>
              <option value="mid">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.level && (<p className="text-red-500 text-sm">{errors.level.message}</p>)}
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

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-2 mt-3 transition-transform duration-150 hover:scale-[0.98] bg-purple-800 mx-auto block w-full text-white rounded-md hover:bg-900"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
