import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../../services/axiosInstance";
import PaperViewStructure from "./PaperViewStructure";

const ViewPaperPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [paperData, setPaperData] = useState(null);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axiosInstance.get(`v2/paper/${id}`);
        console.log("res", res.data.data);
        setPaperData(res.data.data);
      } catch (error) {
        console.log("Failed to load paper:", error);
      }
    };
    fetchPaper();
  }, [id]);

  if (!paperData)
    return (
      <p className="text-center mt-10 text-gray-500">Loading paper....</p>
    );

  return (
    <div className="p-6">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all shadow-sm"
      >
        ← Back
      </button>

      <PaperViewStructure
        data={paperData}
        questionsList={paperData.question} 
        selectedQuestions={paperData.question?.map((q) => q._id)} // all question IDs
      />
    </div>
  );
};

export default ViewPaperPage;
