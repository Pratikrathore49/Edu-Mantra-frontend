
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPapersAsync } from "../../redux/paper/paperSlice";
import { BookOpen, Clock, FileText, Award } from "lucide-react"; // icons
import { Link } from "react-router";
import PaperView from "./PaperView";

const Papers = () => {
  const [isView,setIsView] = useState(false)
  const dispatch = useDispatch();
  const papersList = useSelector((state) => state.paper.allPapers || []);

  useEffect(() => {
    dispatch(fetchAllPapersAsync());
  }, [dispatch]);



  return (<>
      <section className="p-8 min-h-screen ">
      <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
        All Papers
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-8">
        {/* + Add Paper Card */}
       <Link to={'/teacher/addPaper'}> <div  
          className="h-[250px] flex flex-col justify-center items-center bg-white border-2 border-dashed border-purple-400 text-purple-600 text-6xl font-bold rounded-2xl cursor-pointer hover:bg-purple-100 hover:scale-105 transition-transform duration-300 shadow-sm"
        >
          +
          <p className="text-base mt-3 font-semibold text-purple-700">
            Add Paper
          </p>
        </div></Link>

        {/* Paper Cards */}
        {papersList?.map((paper) => (
          <div
            key={paper._id}
            className="bg-white rounded-2xl shadow-md border border-purple-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-purple-500 text-white text-center py-3">
              <h2 className="text-lg font-semibold truncate">{paper.name}</h2>
            </div>

            {/* Body */}
            <div className="p-4 flex-1 space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <p>
                  <span className="font-medium">Subject:</span> {paper.subject}
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
            <div className="p-4 bg-purple-50 flex justify-center">
              <button
                // onClick={() => handleViewPaper(paper)}
                onClick={()=>setIsView(true)}
                className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg w-full hover:bg-purple-700 transition-all"
              >
                View Paper
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    { isView && <PaperView />}
    </>

  );
};

export default Papers;
