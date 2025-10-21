
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchQuestionsAsync } from "../../redux/question/questionSlice";

// const Questions = () => {
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(0);
//   const {questions=[],totalPages} = useSelector((state) => state.question?.allQuestions || {});
     
//   const limit = 10;

//   useEffect(() => {
//     dispatch(fetchQuestionsAsync({ skip: page * limit, limit }));
//   }, [page, dispatch]);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="flex flex-wrap justify-between border-b-2 border-gray-300 pb-3 mb-6 items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Questions List</h2>


        

//         {/* Pagination Controls */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//             disabled={page === 0}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             ◀ Previous
//           </button>
//           <span className="text-lg font-semibold text-purple-800">
//            Page  {totalPages}/{page + 1}
//           </span>
//           <button
//             onClick={() => setPage((prev) => prev + 1)}
//             disabled={page === totalPages-1}
//             className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next ▶
//           </button>
//         </div>



//       </div>

//       {/* Questions List */}
//       {questions.length === 0 ? (
//         <p className="text-gray-600 text-center text-lg mt-10">
//           🚫 No questions available
//         </p>
//       ) : (
//         <ul className="space-y-6">
//           {questions.map((q, index) => (
//             <li
//               key={q._id}
//               className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition"
//             >
//               {/* Question Title */}
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="text-lg font-semibold text-gray-900 leading-snug">
//                   {index + 1 + page * limit}. {q.question}
//                 </h3>
//                 <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full whitespace-nowrap">
//                   {q.subject} • {q.level}
//                 </span>
//               </div>

//               {/* Options */}
//               <ul className="space-y-1 ml-4 text-gray-700">
//                 <li>
//                   <span className="font-medium">A.</span> {q.option1}
//                 </li>
//                 <li>
//                   <span className="font-medium">B.</span> {q.option2}
//                 </li>
//                 <li>
//                   <span className="font-medium">C.</span> {q.option3}
//                 </li>
//                 <li>
//                   <span className="font-medium">D.</span> {q.option4}
//                 </li>
//               </ul>

//               {/* Answer and Note */}
//               <div className="mt-4 border-t border-gray-200 pt-2">
//                 <p className="text-green-700 font-semibold">
//                   ✅ Correct Answer:{" "}
//                   <span className="text-green-900">{q.answer}</span>
//                 </p>
//                 {q.note && (
//                   <p className="text-sm text-gray-600 italic mt-1">
//                     📝 {q.note}
//                   </p>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Questions;







import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestionAsync, fetchQuestionsAsync } from "../../redux/question/questionSlice";
import { useNavigate } from "react-router";
import UpdateQuestion from "./UpdateQuestion";

const Questions = () => {
  const [isQuestionEdit,setIsQuestionEdit] = useState({isopen:false,data:null})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { questions = [], totalPages } =useSelector((state) => state.question?.allQuestions || {});
  const limit = 10;

  useEffect(() => {
    dispatch(fetchQuestionsAsync({ skip: page * limit, limit }));
  }, [page, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      console.log("Deleting question with id:", id);
       dispatch(deleteQuestionAsync(id)); // Uncomment when delete API ready
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-question/${id}`);
  };

  return (<>
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between border-b-2 border-gray-300 pb-3 mb-6 items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          🧾 Questions List
        </h2>

        {/* Pagination Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀ Previous
          </button>
          <span className="text-lg font-semibold text-purple-800">
            Page {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <p className="text-gray-600 text-center text-lg mt-10">
          🚫 No questions available
        </p>
      ) : (
        <ul className="space-y-6">
          {questions.map((q, index) => (
            <li
              key={q._id}
              className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 border border-gray-200 transition duration-300"
            >
              {/* Question Title */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                  {index + 1 + page * limit}. {q.question}
                </h3>
                <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full whitespace-nowrap font-medium">
                  {q.subject} • {q.level}
                </span>
              </div>

              {/* Options */}
              <ul className="space-y-1 ml-4 text-gray-700">
                <li>
                  <span className="font-medium">A.</span> {q.option1}
                </li>
                <li>
                  <span className="font-medium">B.</span> {q.option2}
                </li>
                <li>
                  <span className="font-medium">C.</span> {q.option3}
                </li>
                <li>
                  <span className="font-medium">D.</span> {q.option4}
                </li>
              </ul>

              {/* Answer and Note */}
              <div className="mt-4 border-t border-gray-200 pt-2">
                <p className="text-green-700 font-semibold">
                  ✅ Correct Answer:{" "}
                  <span className="text-green-900">{q.answer}</span>
                </p>
                {q.note && (
                  <p className="text-sm text-gray-600 italic mt-1">
                    📝 {q.note}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setIsQuestionEdit({isopen:true,data:q})}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-md"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(q._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-md"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    {
      isQuestionEdit.isopen && <UpdateQuestion isQuestionEdit={isQuestionEdit} setIsQuestionEdit={setIsQuestionEdit}/>
    }
    </>
  );
};

export default Questions;
