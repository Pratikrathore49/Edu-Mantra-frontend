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
    
    return res.data.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message|| 'Adding Question Failed',
      status:error.response?.status || 500
    };
  }
};


export const fetchQuestionsApi= async ({ skip, limit }) => {
  try {
    
    const res = await axiosInstance.get(
      `v3/question?skip=${skip}&limit=${limit}`
    );
    return res.data.data;
  } catch (error) {
    throw{
    message :error.response?.data?.message || error.message || 'Fetching Question Failed',
    status:error.response?.status || 500
    }
  }
};

export const deleteQuestionApi = async(id)=>{
  try{
     const res = await axiosInstance.delete(`v3/question/delete/${id}`)
    return  res.data
  }catch (error) {
    throw{
    message :error.response?.data?.message || error.message || 'Fetching Question Failed',
    status:error.response?.status || 500
    }
  }
}


export const updateQuestionApi = async(data)=>{
  try{
    const res = await axiosInstance.patch(`v3/question/update/${data._id}`,data)
    return res.data
  }catch (error) {
    throw{
    message :error.response?.data?.message || error.message || 'Fetching Question Failed',
    status:error.response?.status || 500
    }
  }
}


