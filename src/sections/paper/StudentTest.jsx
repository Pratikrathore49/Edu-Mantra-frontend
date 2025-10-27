import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaperByIdAsync } from "../../redux/paper/paperSlice";
import {
  clearResult,
  fetchResultAsync,
  submitResultAsync,
} from "../../redux/result/resultSlice";
import { useParams } from "react-router";
import StuTestResult from "./StuTestResult";

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

  function retakeTest() {
    setSubmitted(false);
    setResult(null);
    setAnswers({});
    setPage(0);
    dispatch(clearResult());
  }

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
        <StuTestResult result={result} retakeTest={retakeTest} />
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
