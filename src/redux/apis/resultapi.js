import axiosInstance from "../../services/axiosInstance";

export const submitResultApi = async (paperId, payload) => {
  try {
    const res = await axiosInstance.post(
      `/v2/result/addResult/${paperId}`,
      payload
    );
    return res.data;
  } catch (error) {
    throw {
      message:
        error.response?.data?.message ||
        error.message ||
        "Result Submittion failed",
      status: error.response?.status || 500,
    };
  }
};

export const fetchResultApi = async (paperId) => {
  try {
    const res = await axiosInstance.get(`/v2/result/getResult/${paperId}`);
    return res.data;
  } catch (error) {
    throw {
      message:
        error.response?.data?.message ||
        error.message ||
        "Result Fetching Failed ",
      status: error.response?.status || 500,
    };
  }
};
