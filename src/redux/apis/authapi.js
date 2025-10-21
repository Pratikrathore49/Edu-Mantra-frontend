import axiosInstance from "../../services/axiosInstance";

export const studentLoginApi = async (Credentials) => {
  try {
    const response = await axiosInstance.post(
      "v1/auth/student/login",
      Credentials
    );
    return response.data.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || "login failed",
      status: error.response?.status || 500,
    };
  }
};

export const registerStudentApi = async (studentData) => {
  try {
    const response = await axiosInstance.post(
      "v1/auth/student/register",
      studentData
    );
    return response.data.data;
  } catch (error) {
    throw {
      message:
        error.response?.data?.message || error.message || "registration failed",
      status: error.response?.status || 500,
    };
  }
};

export const teacherLoginApi = async (Credentials) => {
  try {
    const response = await axiosInstance.post(
      "v1/auth/teacher/login",
      Credentials
    );
    return response.data.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || "login failed",
      status: error.response?.status || 500,
    };
  }
};

export const registerTeacherApi = async (teacherData) => {
  try {
    const response = await axiosInstance.post(
      "v1/auth/teacher/register",
      teacherData
    );
    return response.data.data;
  } catch (error) {
    throw {
      message:
        error.response?.data?.message || error.message || "registration failed",
      status: error.response?.status || 500,
    };
  }
};

export const checkUserApi = async () => {
  try {
    const response = await axiosInstance.get("me");

    return response.data;
  } catch (error) {
    console.log("me",error)
    throw {
      message:
        error.response?.data?.message || error.message || "registration failed",
      status: error.response?.status || 500,
    };
  }
};
