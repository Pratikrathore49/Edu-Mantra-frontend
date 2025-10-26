import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaperByIdAsync } from "../../redux/paper/paperSlice";
import { Clock, BookOpen, Award } from "lucide-react"; // ⬅️ Add this at the top
import {
  clearResult,
  fetchResultAsync,
  submitResultAsync,
} from "../../redux/result/resultSlice";
import { useParams } from "react-router";
import { quesExplainationAsync } from "../../redux/ai/aiSlice";

const StudentTest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { onePaper, loading: paperLoading } = useSelector(
    (state) => state.paper
  );
  const { result: storedResult, loading: resultLoading } = useSelector(
    (state) => state.result || {}
  );
  const authUser = useSelector((state) => state.auth.user);
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const questions = useMemo(() => onePaper?.question || [], [onePaper]);
  const { AllExplanations: explanations, loading: loadingQues } = useSelector(
    (state) => state.ai || {}
  );



  useEffect(() => {
    if (!authUser?._id) return;
    dispatch(clearResult());
    dispatch(fetchPaperByIdAsync(id));
    dispatch(fetchResultAsync(id)); // fetch previous result (if any)
  }, [dispatch, id, authUser]);

  useEffect(() => {
    if (storedResult) {
      setSubmitted(true);
      setResult(storedResult);
    } else {
      setSubmitted(false);
      setResult(null);
    }
  }, [storedResult]);

  if (paperLoading || resultLoading || !onePaper) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  const handleAiExplain = async (ques) => {
    try {
      dispatch(quesExplainationAsync(ques));
    } catch (error) {
      console.error("AI Error:", error);
    }
  };

  // compute score locally
  const calculateResult = () => {
    let correct = 0;
    let wrong = 0;
    questions.forEach((q) => {
      const selected = answers[q._id];
      if (selected) {
        if (selected === q.answer) correct++;
        else wrong++;
      }
    });
    const total = questions.length;
    const percentage = total ? ((correct / total) * 100).toFixed(2) : 0;
    const score = correct; // or any scoring formula
    return { correct, wrong, total, percentage: Number(percentage), score };
  };

  const handleSubmit = async () => {
    const computed = calculateResult();

    const payload = {
      studentId: authUser?._id,
      answers,
      score: computed.score,
      total: computed.total,
      percentage: computed.percentage,
    };

    try {
      const res = await dispatch(
        submitResultAsync({ paperId: id, payload })
      ).unwrap();

      setResult(res);
      setSubmitted(true);
    } catch (err) {
      alert("Submit failed. Try again.");
    }
  };

  if (submitted && result) {
    return (
      <>
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto my-6 mb-12 ">
          <div className="text-center border-b pb-5 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
              {result.paper.name}
            </h2>
            <p className="text-gray-500 mt-2 text-lg italic">
              {result.paper.examType}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center text-gray-700 mb-6 text-sm sm:text-base gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <p className="font-medium">
                <span className="font-semibold text-gray-800">Duration:</span>{" "}
                {result.paper.duration} min
              </p>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-500" />
              <p className="font-medium">
                <span className="font-semibold text-gray-800">Subject:</span>{" "}
                {result.paper.subject}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <p className="font-medium">
                <span className="font-semibold text-gray-800">
                  Total Marks:
                </span>
                {result.paper.totalMarks}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center  p-6">
            <div className="bg-white rounded-xl shadow p-6 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-center">
                Your Previous Result
              </h2>
              <p className="mt-3 text-purple-600 text-2xl">
                Score: {result.score} / {result.total}
              </p>
              <p className="text-green-500 text-xl">
                Correct: {result.score ?? "—"}
              </p>
              <p className="text-red-500 text-xl">
                Wrong: {result.total - result.score ?? "—"}
              </p>
              <p className="text-blue-500"> Percentage: {result.percentage}%</p>

              <div className="mt-4 flex justify-center gap-3">
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                  onClick={() => {
                    // allow retake: clear result view and reset state to retake test
                    setSubmitted(false);
                    setResult(null);
                    setAnswers({});
                    setPage(0);
                    dispatch(clearResult());
                  }}
                >
                  Retake
                </button>
              </div>
            </div>
          </div>

          <ul className="space-y-6">
            {result?.paper?.question?.map((ques, index) => (
              <li
                key={ques._id}
                className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200 bg-gray-50"
              >
                <div className="flex items-start gap-2 mb-3">
                  <span className="font-semibold text-gray-700 text-lg">
                    Q{index + 1}.
                  </span>
                  <p className="text-gray-800 leading-relaxed text-base">
                    {ques.question}
                  </p>
                  <button
                    onClick={() => handleAiExplain(ques)}
                    className="bg-purple-200 border border-purple-500 p-1 cursor-pointer rounded px-2 text-sm hover:bg-purple-300 transition"
                  >
                    {loadingQues === ques._id ? "Loading..." : "AI Explanation"}
                  </button>
                </div>
                <ul className="space-y-2 ml-6 mt-2 text-gray-700">
                  {["option1", "option2", "option3", "option4"].map(
                    (optKey, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 p-2  rounded transition bg-gray-100 ${
                          ques.answer?.trim() === ques[optKey]?.trim() &&
                          result.answers[ques._id].trim() === ques[optKey]
                            ? "bg-green-100 border border-green-400 "
                            : ""
                        }
                 
                ${
                  ques.answer?.trim() === ques[optKey]?.trim() &&
                  result.answers[ques._id].trim() &&
                  result.answers[ques._id].trim() !== ques[optKey]
                    ? "border border-yellow-400 bg-yellow-100"
                    : ""
                }
                
                 ${
                   ques.answer?.trim() !== ques[optKey]?.trim() &&
                   result.answers[ques._id].trim() === ques[optKey]
                     ? "border border-red-400 bg-red-100"
                     : ""
                 }
                  
                `}
                      >
                        <span className="font-medium">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        <p>{ques[optKey] || "-"}</p>
                      </li>
                    )
                  )}
                </ul>

                {explanations?.[ques._id] && (
                  <p className="my-4 text-sm text-gray-700 bg-purple-50 border border-purple-200 p-2 rounded">
                    💡 {explanations?.[ques._id]}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  // else show test UI (single question per page)
  const currentQuestion = questions[page];
  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  return (
    <section className="flex justify-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full">
        <div className="mb-6 text-center border-b pb-3">
          <h2 className="text-2xl font-bold text-blue-600">
            {onePaper.name} Test
          </h2>
          <p className="text-gray-600">Subject: {onePaper.subject}</p>
        </div>

        {currentQuestion && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Q{page + 1}. {currentQuestion.question}
            </h3>

            <div className="flex flex-col gap-3">
              {["option1", "option2", "option3", "option4"].map((opt) => {
                const optionText = currentQuestion[opt];
                if (!optionText) return null;
                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
                      answers[currentQuestion._id] === optionText
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion._id}
                      checked={answers[currentQuestion._id] === optionText}
                      onChange={() =>
                        handleOptionChange(currentQuestion._id, optionText)
                      }
                    />
                    <span>{optionText}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Previous
          </button>
          <span>
            Question {page + 1}/{questions.length}
          </span>
          {page === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() =>
                setPage((p) => Math.min(p + 1, questions.length - 1))
              }
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentTest;
