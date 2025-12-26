   import axios from "axios";
   const axiosInstance = axios.create({
        baseURL:"https://edu-mantra-backend.onrender.com/api/",
        
        withCredentials: true,
        
   });
   export default axiosInstance;





