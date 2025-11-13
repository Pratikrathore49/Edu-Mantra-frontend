import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPapersAsync } from "../../redux/paper/paperSlice";
import { Link } from "react-router";

const AllSubjectsPaper = () => {
  const { papers = [] } = useSelector((state) => state?.paper?.allPapers || {}) || {};
  const { loading } = useSelector((state) => state.paper);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPapersAsync({ skip: 0, limit: 50 }));
  }, [dispatch]);

  // ✅ Get unique subjects
  const uniqueSubjects = [...new Set(papers.map((p) => p.subject))];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        All Subjects
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading subjects...</p>
      ) : uniqueSubjects.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No subjects found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {uniqueSubjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {subject}
              </h2>
              <p className="text-gray-600 mb-6">
                Explore all test papers related to <span className="font-medium">{subject}</span>.
              </p>                   
             <Link to={`papers/${encodeURIComponent(subject)}`}> <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                
              >
                View Test Papers
              </button></Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubjectsPaper;
