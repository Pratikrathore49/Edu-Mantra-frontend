import axiosInstance from "../../services/axiosInstance";

export const getTeacherDetailsApi= async () => {
  try {
    const response = await axiosInstance.get('v2/teache/');
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || "Error In Fetching Student Details",
      status: error.response?.status || 500,
    };
  }
};



export const getStudentDetailsApi = async () => {
  try {
    const response = await axiosInstance.get('v2/student/details');
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || "Error In Fetching Student Details",
      status: error.response?.status || 500,
    };
  }
};



export const updateStudentDetailsApi = async(data) => {
  try {
    const response = await axiosInstance.patch('v2/student/update',data);
    console.log("res api",response.data)
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || "Student Updatation Failed",
      status: error.response?.status || 500,
    };
  }
};