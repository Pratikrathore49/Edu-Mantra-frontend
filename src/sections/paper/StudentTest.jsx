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
  const { result: storedResult, loading: resultLoading } = useSelector((state) => state.result || {});
  console.log('result',storedResult)
  const authUser = useSelector((state) => state.auth.user);
  const [time, setTime] = useState(onePaper?.duration * 60);
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const questions = useMemo(() => onePaper?.question || [], [onePaper]);

  console.log("onePapger", onePaper);

  // ✅ Fetch data
  useEffect(() => {
    if (!authUser?._id) return;
    dispatch(clearResult());
    dispatch(fetchPaperByIdAsync(id));
    dispatch(fetchResultAsync(id));
  }, [dispatch, id, authUser]);

  // ✅ If result exists
  useEffect(() => {
    if (storedResult) {
      setSubmitted(true);
      setResult(storedResult);
    } else {
      setSubmitted(false);
      setResult(null);
    }
  }, [storedResult]);

  // ✅ FIXED TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (onePaper?.duration) {
      setTime(onePaper.duration * 60);
    }
  }, [onePaper]);

  useEffect(() => {
    if (time === 0 && !submitted) {
      handleSubmit();
    }
  }, [time, submitted]);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (paperLoading || resultLoading || !onePaper) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
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
     setTime(onePaper.duration * 60);
  }

  // ✅ Calculate score
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

    return {
      correct,
      wrong,
      total,
      percentage: Number(percentage),
      score: correct,
    };
  };

  // ✅ Submit exam
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

  // ✅ Show result
  if (submitted && result) {
    return <StuTestResult result={result} retakeTest={retakeTest} />;
  }

  const currentQuestion = questions[page];

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  return (
    <section className="flex justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative">
        <div className="mb-6 text-center border-b pb-3">
          <h2 className="text-3xl font-bold text-purple-600 capitalize">
            {onePaper.name} Test
          </h2>
          <p className="text-gray-500 text-lg">
            Subject: <span className="font-medium">{onePaper.subject}</span>
          </p>
        </div>

        {/* ✅ Timer Badge */}
        <div className="absolute top-30 right-8 bg-purple-700 text-white px-4 py-1 rounded-full text-lg font-semibold shadow">
          ⏳ {formatTime(time)}
        </div>

        {currentQuestion && (
          <div className="pt-12 pb-8">
            <h3 className="text-xl font-semibold mb-4">
              Q{page + 1}. {currentQuestion.question}
            </h3>

            <div className="flex flex-col gap-4">
              {["option1", "option2", "option3", "option4"].map((opt) => {
                const optionText = currentQuestion[opt];
                if (!optionText) return null;

                return (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition 
                      ${
                        answers[currentQuestion._id] === optionText
                          ? "border-purple-500 bg-purple-50 shadow"
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
                    />
                    <span className="text-lg">{optionText}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* ✅ Bottom Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className={`px-5 py-2 rounded-lg text-white cursor-pointer ${
              page === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600"
            }`}
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            {page + 1}/{questions.length}
          </span>

          {page === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() =>
                setPage((p) => Math.min(p + 1, questions.length - 1))
              }
              className="px-6 py-2 bg-purple-700 text-white rounded-lg shadow cursor-pointer hover:bg-purple-700"
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
