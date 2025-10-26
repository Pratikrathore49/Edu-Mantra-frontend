import axiosInstance from "../../services/axiosInstance";

export const quesExplainationApi = async (ques) => {
  try {
    const res = await axiosInstance.post("v2/ai/quesExplanation", {
      question_id: ques._id,
      question: ques.question,
      correctAnswer: ques.answer,
    });
      return res.data
  } catch (error) {
    throw{
        message: error.response?.data?.message ||
        error.message || 'Explanation Fetching Failed',
        status:error.response?.status || 500
    }
  }
};
