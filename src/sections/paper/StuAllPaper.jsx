
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllPapersAsync } from "../../redux/paper/paperSlice";
// import { Link } from "react-router";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const StuAllPaper = () => {
//   const dispatch = useDispatch();

//   const [page, setPage] = useState(0);
//   const limit = 10;

//   const { papers = [], totalPages } =
//     useSelector((state) => state?.paper?.allPapers || {}) || {};
//   const { loading } = useSelector((state) => state.paper);

//   useEffect(() => {
//     const skip = page * limit;
//     dispatch(fetchAllPapersAsync({ skip, limit }));
//   }, [page, dispatch]);

//   const colors = [
//     "bg-orange-500",
//     "bg-gray-700",
//     "bg-sky-500",
//     "bg-purple-500",
//     "bg-green-500",
//     "bg-red-500",
//     "bg-yellow-500",
//     "bg-pink-500",
//     "bg-blue-600",
//   ];

//   if (loading)
//     return (
//       <div className="text-center text-xl font-medium text-gray-600 py-10 animate-pulse">
//         Loading papers...
//       </div>
//     );

//   return (
//     <div className="px-4 sm:px-6 md:px-10 py-8">
//       {/* Header + Pagination */}
//       <div className="flex justify-between items-center mb-8">
//         <h3 className="font-bold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
//           Explore All Papers
//         </h3>

//         {/* Modern Pagination */}
//         <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md shadow-md py-2 px-4 rounded-xl border border-gray-200">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
//             disabled={page === 0}
//             className="p-2 rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
//           >
//             <ChevronLeft size={22} className="text-gray-600" />
//           </button>

//           <span className="text-lg font-semibold text-gray-800">
//             {page + 1} / {totalPages}
//           </span>

//           <button
//             onClick={() => setPage((prev) => prev + 1)}
//             disabled={page === totalPages - 1}
//             className="p-2 rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
//           >
//             <ChevronRight size={22} className="text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Papers Grid */}
//       <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
//         {papers.map((data, idx) => (
//           <div
//             key={data._id}
//             className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200
//             hover:shadow-2xl hover:-translate-y-2 hover:border-purple-300
//             transition-all duration-300"
//           >
//             {/* Badge */}
//             <div
//               className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full 
//               text-white text-xl font-bold mb-4 shadow-lg ${colors[idx % colors.length]}`}
//             >
//               {idx + 1 + page * limit}
//             </div>

//             <h3 className="text-xl font-semibold text-gray-800 capitalize mb-1 text-center">
//               {data.name}
//             </h3>

//             <p className="text-center text-purple-700 font-medium mb-4">
//               {data.subject}
//             </p>

//             <div className="text-center space-y-1 text-gray-600">
//               <p>
//                 <span className="font-medium text-gray-700">Duration:</span>{" "}
//                 {data.duration} min
//               </p>
//               <p>
//                 <span className="font-medium text-gray-700">Total Marks:</span>{" "}
//                 {data.totalMarks}
//               </p>

//               {data.examType && (
//                 <p>
//                   <span className="font-medium text-gray-700">Exam Type:</span>{" "}
//                   {data.examType}
//                 </p>
//               )}
//             </div>

//             <Link to={`test/${data._id}`}>
//               <button className="
//                 mt-6 w-[85%] ml-[7.5%] py-2.5 
//                 bg-gradient-to-r from-purple-600 to-blue-600
//                 text-white font-semibold rounded-lg 
//                 shadow-md hover:shadow-lg hover:scale-[1.03]
//                 transition-all duration-300 cursor-pointer">
//                 Start Exam
//               </button>
//             </Link>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default StuAllPaper;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPapersAsync } from "../../redux/paper/paperSlice";
import { Link, useParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StuAllPaper = () => {
  const { subject } = useParams(); 
   const decodedSubject = decodeURIComponent(subject);
  // ✅ URL se subject nikal liya
  console.log('subject',subject)
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const limit = 10;

  const { papers = [], totalPages } = useSelector((state) => state?.paper?.allPapers || {}) || {};
  const { loading } = useSelector((state) => state.paper);

  useEffect(() => {
    const skip = page * limit;
    // ✅ API call me subject bhej rahe hain (industry standard)
    dispatch(fetchAllPapersAsync({ skip, limit, decodedSubject }));
  }, [page, subject, dispatch]);

  const colors = [
    "bg-orange-500", "bg-gray-700", "bg-sky-500",
    "bg-purple-500", "bg-green-500", "bg-red-500",
    "bg-yellow-500", "bg-pink-500", "bg-blue-600",
  ];

  if (loading)
    return (
      <div className="text-center text-xl font-medium text-gray-600 py-10 animate-pulse">
        Loading papers...
      </div>
    );

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          {subject ? `${subject} Papers` : "Explore All Papers"}
        </h3>

        {/* Pagination */}
        <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md shadow-md py-2 px-4 rounded-xl border border-gray-200">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="p-2 rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={22} className="text-gray-600" />
          </button>

          <span className="text-lg font-semibold text-gray-800">
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages - 1}
            className="p-2 rounded-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronRight size={22} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Papers Grid */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
        {papers.map((data, idx) => (
          <div
            key={data._id}
            className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200
            hover:shadow-2xl hover:-translate-y-2 hover:border-purple-300
            transition-all duration-300"
          >
            <div
              className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full
               text-white text-xl font-bold mb-4 shadow-lg ${colors[idx % colors.length]}`}
            >
              {idx + 1 + page * limit}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 capitalize mb-1 text-center">
              {data.name}
            </h3>

            <p className="text-center text-purple-700 font-medium mb-4">
              {data.subject}
            </p>

            <div className="text-center space-y-1 text-gray-600">
              <p><span className="font-medium text-gray-700">Duration:</span> {data.duration} min</p>
              <p><span className="font-medium text-gray-700">Total Marks:</span> {data.totalMarks}</p>
              {data.examType && (
                <p><span className="font-medium text-gray-700">Exam Type:</span> {data.examType}</p>
              )}
            </div>

            <Link to={`test/${data._id}`}>
              <button className="mt-6 w-[85%] ml-[7.5%] py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                Start Exam
              </button>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StuAllPaper;
