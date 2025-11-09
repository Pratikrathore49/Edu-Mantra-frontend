import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePapersAsync, fetchAllPapersAsync, updatePaperAsync } from "../../redux/paper/paperSlice";
import {BookOpen,Clock,FileText,Award,ChevronLeft,ChevronRight,} from "lucide-react";
import { Link } from "react-router";
import UpdatePaper from "./updatePaper";

const Papers = () => {
  const dispatch = useDispatch();
  const [isUpdatePaper,setIsUpdatePaper] = useState(false)
  const [page, setPage] = useState(0);
  const limit = 10;

  const { papers = [], totalPages } =
    useSelector((state) => state?.paper?.allPapers || {}) || {};
  const { loading } = useSelector((state) => state.paper);

  useEffect(() => {
    const skip = page * limit;
    dispatch(fetchAllPapersAsync({ skip, limit }));
  }, [page, dispatch]);

  if (loading)
    return (
      <div className="text-center text-xl font-medium text-gray-600 py-10 animate-pulse">
        Loading papers...
      </div>
    );
   function updateCencelFun(){
      setIsUpdatePaper({isopen:false,data:null})
    }

  return (
    <>  { isUpdatePaper.isopen && <UpdatePaper paper={isUpdatePaper.data} updateCencelFun={updateCencelFun}/>}
      <section className="min-h-screen flex">
        <div className="flex-1 p-8">
          {/* Header + Pagination */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800 text-center">
              All Papers
            </h1>

            {/* Pagination Box */}
            <div className="flex items-center gap-4 bg-white shadow-md py-2 px-4 rounded-xl border border-gray-200">
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

          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-8">
            {/* Add Paper Card */}
            <Link to={"/teacher/addPaper"}>
              <div className="h-[250px] flex flex-col justify-center items-center bg-white border-2 border-dashed border-purple-400 text-purple-600 text-6xl font-bold rounded-2xl cursor-pointer hover:bg-purple-100 hover:scale-105 transition-transform duration-300 shadow-sm">
                +
                <p className="text-base mt-3 font-semibold text-purple-700">
                  Add Paper
                </p>
              </div>
            </Link>

            {/* Paper Cards */}
            {papers?.map((paper) => (
              <div
                key={paper._id}
                className="bg-white rounded-2xl shadow-md border border-purple-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="border-b-1 text-center py-3">
                  <h2 className="text-lg font-semibold truncate capitalize">
                    {paper.name}
                  </h2>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <p>
                      <span className="font-medium">Subject:</span>{" "}
                      {paper.subject}
                    </p>
                  </div>

                  {paper.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <p>
                        <span className="font-medium">Duration:</span>{" "}
                        {paper.duration} mins
                      </p>
                    </div>
                  )}

                  {paper.totalMarks && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <p>
                        <span className="font-medium">Total Marks:</span>{" "}
                        {paper.totalMarks}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <p>
                      <span className="font-medium">Questions:</span>{" "}
                      {paper.question?.length || 0}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-purple-50 flex justify-center gap-4">
                  <Link to={`viewPaper/${paper._id}`}>
                    <button className="px-4 py-2 text-sm font-medium bg-purple-500 text-white rounded-lg  hover:bg-purple-700 transition-all cursor-pointer">
                      View
                    </button>
                  </Link>

                  <button onClick={()=>setIsUpdatePaper({isopen:true,data:paper})} className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all cursor-pointer">
                    update
                  </button>

                  <button onClick={()=>(dispatch(deletePapersAsync(paper._id)))} className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all cursor-pointer">
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Papers;
