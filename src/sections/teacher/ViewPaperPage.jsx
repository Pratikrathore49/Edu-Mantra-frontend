import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../../services/axiosInstance";
import PaperViewStructure from "./PaperViewStructure";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaperByIdAsync } from "../../redux/paper/paperSlice";

const ViewPaperPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onePaper } = useSelector((state) => state.paper);


   useEffect(() => {
    dispatch(fetchPaperByIdAsync(id));
  }, [dispatch]);


  if (!onePaper)
    return <p className="text-center mt-10 text-gray-500">Loading paper....</p>;

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
        data={onePaper}
        questionsList={onePaper.question}
        selectedQuestions={onePaper.question?.map((q) => q._id)} // all question IDs
      />
    </div>
  );
};

export default ViewPaperPage;
