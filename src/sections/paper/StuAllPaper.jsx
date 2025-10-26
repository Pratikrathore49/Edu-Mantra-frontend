import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPapersAsync } from "../../redux/paper/paperSlice";
import { Link } from "react-router";

const StuAllPaper = () => {
  const { allPapers, loading } = useSelector((state) => state.paper);
  const dispatch = useDispatch();

 

  useEffect(() => {
    dispatch(fetchAllPapersAsync());
  }, [dispatch]);

  const colors = [
    "bg-orange-500",
    "bg-gray-700",
    "bg-sky-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-blue-600",
  ];

  if (loading)
    return (
      <div className="text-center text-lg text-gray-600 py-10">
        Loading papers...
      </div>
    );



  return (
    <div className="flex flex-col  gap-2 my-6 ml-4 ">
      <h3 className="font-semibold text-2xl ml-4">All Papers</h3>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
        {allPapers.map((data, idx) => (
          <div
            key={data._id}
            className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top Badge */}
            <div
              className={`w-12 h-12 mx-auto flex items-center justify-center rounded-full  text-white text-lg font-bold mb-3 shadow-sm ${
                colors[idx % colors.length]
              }`}
            >
              {idx + 1}
            </div>

            {/* Paper Name */}
            <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">
              {data.name}
            </h3>

            {/* Subject */}
            <p className="text-sm text-gray-500 mb-1">
              Subject:{" "}
              <span className="font-medium text-gray-700 capitalize">
                {data.subject}
              </span>
            </p>

            {/* Duration */}
            <p className="text-sm text-gray-500 mb-1">
              Duration:{" "}
              <span className="font-medium text-gray-700">
                {data.duration} min
              </span>
            </p>

            {/* Total Marks */}
            <p className="text-sm text-gray-500 mb-1">
              Total Marks:{" "}
              <span className="font-medium text-gray-700">
                {data.totalMarks}
              </span>
            </p>

            {/* Exam Type */}
            {data.examType && (
              <p className="text-sm text-gray-500 mb-3">
                Exam Type:{" "}
                <span className="font-medium text-gray-700 capitalize">
                  {data.examType}
                </span>
              </p>
            )}

            {/* Button */}
            <Link to={`test/${data._id}`}>
              {" "}
              <button className="mt-3 px-5 py-2 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer">
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
