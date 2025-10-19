
const PaperView = ({ data, questionsList, selectedQuestions }) => {
  const selected = questionsList.filter((q) =>
    (selectedQuestions || []).includes(q._id)
  );

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center border-b pb-5 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
          {data.name || "Untitled Paper"}
        </h2>
        <p className="text-gray-500 mt-2 text-lg italic">
          {data.examType || "Exam Name"}
        </p>
      </div>

      {/* Info Section */}
      <div className="flex flex-wrap items-center justify-between text-gray-700 mb-6 text-sm sm:text-base">
        <p>
          <span className="font-semibold">Duration:</span>{" "}
          {data.duration ? `${data.duration} min` : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Subject:</span>{" "}
          {data.subject || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Total Marks:</span>{" "}
          {data.totalMarks || "N/A"}
        </p>
        <p>
          {data.isPaid ? (
            <span className="text-purple-700 font-semibold bg-purple-50 border border-purple-200 px-3 py-1 rounded-full text-sm">
              Paid Paper
            </span>
          ) : (
            <span className="text-green-700 font-semibold bg-green-50 border border-green-200 px-3 py-1 rounded-full text-sm">
              Free Paper
            </span>
          )}
        </p>
      </div>

      {/* Note Section */}
      {data.note && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <h4 className="font-semibold text-gray-800 mb-1">Note:</h4>
          <p className="text-gray-700 leading-relaxed">{data.note}</p>
        </div>
      )}

      {/* Questions Section */}
      <div>
        <div className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex justify-between">
          <h4>Questions</h4>
          <p>Total Questions: {selectedQuestions.length}</p>
        </div>

        {selectedQuestions.length === 0 ? (
          <p className="text-gray-400 italic text-center mt-3">
            No questions selected yet
          </p>
        ) : (
          <ul className="space-y-6">
            {selected.map((q, index) => (
              <li
                key={q._id}
                className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200 bg-gray-50"
              >
                {/* Question Title */}
                <div className="flex items-start gap-2 mb-3">
                  <span className="font-semibold text-gray-700 text-lg">
                    Q{index + 1}.
                  </span>
                  <p className="text-gray-800 leading-relaxed text-base">
                    {q.title || q.question || "Untitled Question"}
                  </p>
                </div>

                {/* Options */}
                <ul className="space-y-2 ml-6 mt-2 text-gray-700">
                  {["option1", "option2", "option3", "option4"].map(
                    (optKey, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 p-2 rounded transition ${
                          q.answer?.trim() === q[optKey]?.trim()
                            ? "bg-green-50 border border-green-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span className="font-medium">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        <p>{q[optKey] || "-"}</p>
                      </li>
                    )
                  )}
                </ul>

                {/* Answer & Note */}
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <p className="text-green-700 font-semibold">
                    ✅ Correct Answer:{" "}
                    <span className="text-green-900">{q.answer}</span>
                  </p>
                  {q.note && (
                    <p className="text-sm text-gray-600 italic mt-1">
                      📝 {q.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-sm text-gray-400">
        <p>Generated Preview • {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PaperView;
