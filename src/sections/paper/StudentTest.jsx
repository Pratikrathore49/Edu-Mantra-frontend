import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaperByIdAsync } from "../../redux/paper/paperSlice";
import { useParams } from "react-router";

const StudentTest = () => {
    const {id} = useParams()
  const dispatch = useDispatch();
  const { onePaper, loading } = useSelector((state) => state.paper);
  const [page, setPage] = useState(0); // just like AddPaper pagination
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchPaperByIdAsync(id));
  }, [dispatch]);

  if (loading || !onePaper) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  const questions = onePaper?.question || [];
  const totalPages = questions.length;
  const currentQuestion = questions[page];

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    setSubmitted(true);
    alert("✅ Test submitted successfully!");
  };

  if (submitted) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Test Submitted Successfully 🎉
        </h2>
        <p className="text-gray-700">
          You answered {Object.keys(answers).length} out of {questions.length} questions.
        </p>
      </div>
    );
  }

  return (
    <section className="flex justify-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full">
        {/* Header */}
        <div className="mb-6 text-center border-b pb-3">
          <h2 className="text-2xl font-bold text-blue-600">
            {onePaper?.name} Test
          </h2>
          <p className="text-gray-600">Subject: {onePaper?.subject}</p>
          <p className="text-gray-500 text-sm">
            Duration: {onePaper?.duration} mins
          </p>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Q{page + 1}. {currentQuestion.question}
            </h3>

            <div className="flex flex-col gap-3">
              {["option1", "option2", "option3", "option4"].map((opt) => {
                const optionText = currentQuestion[opt];
                if (!optionText) return null;
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition ${
                      answers[currentQuestion._id] === optionText
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion._id}
                      checked={answers[currentQuestion._id] === optionText}
                      onChange={() =>
                        handleOptionChange(currentQuestion._id, optionText)
                      }
                      className="text-blue-500 focus:ring-blue-400"
                    />
                    <span className="text-gray-700">{optionText}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Pagination Controls (like AddPaper) */}
        <div className="border-t pt-4 flex justify-between items-center">
          <button
            type="button"
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀ Previous
          </button>

          <span className="text-lg font-semibold text-blue-700">
            Question {page + 1}/{totalPages}
          </span>

          {page === totalPages - 1 ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
            >
              Submit ▶
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Next ▶
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentTest;
