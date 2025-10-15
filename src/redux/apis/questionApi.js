import axiosInstance from "../../services/axiosInstance";


export const addQuestionApi = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "figure" && data[key]?.[0]) {
        formData.append("figure", data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    const res = await axiosInstance.post("v3/question/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message,
    };
  }
};

export const fetchQuestions = async () => {
    try {
        const res = await axiosInstance.get(`v2/question?limit=10`);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
}