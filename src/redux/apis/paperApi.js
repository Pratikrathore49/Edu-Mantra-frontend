import axiosInstance from "../../services/axiosInstance"

const addPaperApi =async(data)=>{
    try{
        const res = await axiosInstance.post('/v3/paper/add',data)
        
        return res.data

    }catch(error){
      throw{
        message:error.response?.data?.message || error.message || 'Paper Addtion Failed',
        status:error.response?.status || 500
      }
    }
} 

 const fetchPaperByIdApi = async(id)=>{
   try{
           const res = await axiosInstance.get(`v2/paper/${id}`);
          return res.data
   }catch(error){
     throw{
      message:error.response?.data?.message || error.message ||'Paper Fetching Failed ',
      status:error.response?.status || 500
     }
   }
 }

const fetchAllPapersApi = async()=>{
   try{
          const res = await axiosInstance.get('/v2/paper')
          return res.data
   }catch(error){
     throw{
      message:error.response?.data?.message || error.message ||'Papers Fetching Failed ',
      status:error.response?.status || 500
     }
   }
}

export{addPaperApi,fetchAllPapersApi,fetchPaperByIdApi}