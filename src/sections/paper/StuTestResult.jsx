// import { Award, BookOpen, Clock } from "lucide-react";

// import { useDispatch, useSelector } from "react-redux";
// import { quesExplainationAsync } from "../../redux/ai/aiSlice";

// const StuTestResult = ({ result, retakeTest }) => {

//   console.log("sturesult",result)
//   const { AllExplanations: explanations, loading: loadingQues } = useSelector(
//     (state) => state.ai || {}
//   );

//   const dispatch = useDispatch();
//   const handleAiExplain = async (ques) => {
//     try {
//       dispatch(quesExplainationAsync(ques));
//     } catch (error) {
//       console.error("AI Error:", error);
//     }
//   };
//   return (
//     <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto my-6 mb-12 ">
//       <div className="text-center border-b pb-5 mb-6">
//         <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
//           {result.paper.name}
//         </h2>
//         <p className="text-gray-500 mt-2 text-lg italic">
//           {result.paper.examType}
//         </p>
//       </div>

//       <div className="flex flex-wrap items-center justify-center text-gray-700 mb-6 text-sm sm:text-base gap-6 sm:gap-10">
//         <div className="flex items-center gap-2">
//           <Clock className="w-5 h-5 text-blue-500" />
//           <p className="font-medium">
//             <span className="font-semibold text-gray-800">Duration:</span>
//             {result.paper.duration} min
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <BookOpen className="w-5 h-5 text-green-500" />
//           <p className="font-medium">
//             <span className="font-semibold text-gray-800">Subject:</span>{" "}
//             {result.paper.subject}
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <Award className="w-5 h-5 text-yellow-500" />
//           <p className="font-medium">
//             <span className="font-semibold text-gray-800">Total Marks:</span>
//             {result.paper.totalMarks}
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-col items-center  p-6">
//         <div className="bg-white rounded-xl shadow p-6 max-w-md w-full text-center">
//           <h2 className="text-2xl font-bold text-center">
//             Your Previous Result
//           </h2>
//           <p className="mt-3 text-purple-600 text-2xl">
//             Score: {result.score} / {result.total}
//           </p>
//           <p className="text-green-500 text-xl">
//             Correct: {result.score ?? "—"}
//           </p>
//           <p className="text-red-500 text-xl">
//             Wrong: {result.total - result.score }
//           </p>
//           <p className="text-blue-500"> Percentage: {result.percentage}%</p>

//           <div className="mt-4 flex justify-center gap-3">
//             <button
//               className="px-4 py-2 bg-purple-600 text-white rounded"
//               onClick={retakeTest}
//             >
//               Retake
//             </button>
//           </div>
//         </div>
//       </div>

//       <ul className="space-y-6">
//         {result?.paper?.question?.map((ques, index) => (
//           <li
//             key={ques?._id}
//             className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200 bg-gray-50"
//           >
//             <div className="flex items-start gap-2 mb-3">
//               <span className="font-semibold text-gray-700 text-lg">
//                 Q{index + 1}.
//               </span>
//               <p className="text-gray-800 leading-relaxed text-base">
//                 {ques.question}
//               </p>
//               <button
//                 onClick={() => handleAiExplain(ques)}
//                 className="bg-purple-200 border border-purple-500 p-1 cursor-pointer rounded px-2 text-sm hover:bg-purple-300 transition"
//               >
//                 {loadingQues === ques._id ? "Loading..." : "AI Explanation"}
//               </button>
//             </div>
//             <ul className="space-y-2 ml-6 mt-2 text-gray-700">
//               {["option1", "option2", "option3", "option4"].map((optKey, i) => (
//                 <li
//                   key={i}
//                   className={`flex items-start gap-2 p-2  rounded transition bg-gray-100 ${
//                     ques.answer?.trim() === ques[optKey]?.trim() &&
//                     result?.answers[ques._id]?.trim() === ques[optKey]
//                       ? "bg-green-100 border border-green-400 "
//                       : ""
//                   }
                 
//                 ${
//                   ques.answer?.trim() === ques[optKey]?.trim() &&
//                   result.answers[ques._id]?.trim() &&
//                   result.answers[ques._id]?.trim() !== ques[optKey]
//                     ? "border border-yellow-400 bg-yellow-100"
//                     : ""
//                 }
                
//                  ${
//                    ques.answer?.trim() !== ques[optKey]?.trim() &&
//                    result.answers[ques._id]?.trim() === ques[optKey]
//                      ? "border border-red-400 bg-red-100"
//                      : ""
//                  }
                  
//                 `}
//                 >
//                   <span className="font-medium">
//                     {String.fromCharCode(65 + i)}.
//                   </span>
//                   <p>{ques[optKey] || "-"}</p>
//                 </li>
//               ))}
//             </ul>

//             {explanations?.[ques._id] && (
//               <p className="my-4 text-sm text-gray-700 bg-purple-50 border border-purple-200 p-2 rounded">
//                 💡 {explanations?.[ques._id]}
//               </p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StuTestResult;



import { Award, BookOpen, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { quesExplainationAsync } from "../../redux/ai/aiSlice";

const StuTestResult = ({ result, retakeTest }) => {

  console.log("sturesult", result);
  const { AllExplanations: explanations, loading: loadingQues } = useSelector(
    (state) => state.ai || {}
  );

  const dispatch = useDispatch();

  const handleAiExplain = async (ques) => {
    try {
      dispatch(quesExplainationAsync(ques));
    } catch (error) {
      console.error("AI Error:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto my-6 mb-12 ">
      <div className="text-center border-b pb-5 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
          {result?.paper?.name}
        </h2>
        <p className="text-gray-500 mt-2 text-lg italic">
          {result?.paper?.examType}
        </p>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap items-center justify-center text-gray-700 mb-6 text-sm sm:text-base gap-6 sm:gap-10">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <p className="font-medium">
            <span className="font-semibold text-gray-800">Duration:</span>{" "}
            {result?.paper?.duration} min
          </p>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-500" />
          <p className="font-medium">
            <span className="font-semibold text-gray-800">Subject:</span>{" "}
            {result?.paper?.subject}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <p className="font-medium">
            <span className="font-semibold text-gray-800">Total Marks:</span>{" "}
            {result?.paper?.totalMarks}
          </p>
        </div>
      </div>

      {/* Score Card */}
      <div className="flex flex-col items-center p-6">
        <div className="bg-white rounded-xl shadow p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-center">Your Previous Result</h2>

          <p className="mt-3 text-purple-600 text-2xl">
            Score: {result?.score} / {result?.total}
          </p>

          <p className="text-green-500 text-xl">
            Correct: {result?.score ?? "—"}
          </p>

          <p className="text-red-500 text-xl">
            Wrong: {result?.total - result?.score}
          </p>

          <p className="text-blue-500">
            Percentage: {result?.percentage}%
          </p>

          <div className="mt-4 flex justify-center gap-3">
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded"
              onClick={retakeTest}
            >
              Retake
            </button>
          </div>
        </div>
      </div>

      {/* Questions + Options */}
      <ul className="space-y-6">
        {result?.paper?.question?.map((ques, index) => {
          const userAns = result?.answers?.[ques?._id]?.trim();
          return (
            <li
              key={ques?._id}
              className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200 bg-gray-50"
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="font-semibold text-gray-700 text-lg">
                  Q{index + 1}.
                </span>
                <p className="text-gray-800 leading-relaxed text-base">
                  {ques?.question}
                </p>

                <button
                  onClick={() => handleAiExplain(ques)}
                  className="bg-purple-200 border border-purple-500 p-1 cursor-pointer rounded px-2 text-sm hover:bg-purple-300 transition"
                >
                  {loadingQues === ques?._id ? "Loading..." : "AI Explanation"}
                </button>
              </div>

              {/* Options */}
              <ul className="space-y-2 ml-6 mt-2 text-gray-700">
                {["option1", "option2", "option3", "option4"].map((optKey, i) => {
                  const correctAns = ques?.answer?.trim();
                  const thisOption = ques?.[optKey]?.trim();

                  const isCorrect = correctAns === thisOption;
                  const isUserSelected = userAns === thisOption;

                  let highlight = "";

                  if (isCorrect && isUserSelected) {
                    highlight = "bg-green-100 border border-green-400";
                  } else if (isCorrect && userAns && userAns !== thisOption) {
                    highlight = "bg-yellow-100 border border-yellow-400";
                  } else if (!isCorrect && isUserSelected) {
                    highlight = "bg-red-100 border border-red-400";
                  }

                  return (
                    <li
                      key={i}
                      className={`flex items-start gap-2 p-2 rounded transition bg-gray-100 ${highlight}`}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      <p>{ques?.[optKey] || "-"}</p>
                    </li>
                  );
                })}
              </ul>

              {/* AI Explanation */}
              {explanations?.[ques?._id] && (
                <p className="my-4 text-sm text-gray-700 bg-purple-50 border border-purple-200 p-2 rounded">
                  💡 {explanations?.[ques?._id]}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StuTestResult;
