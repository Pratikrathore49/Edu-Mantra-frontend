   import axios from "axios";
   const axiosInstance = axios.create({
        baseURL:"https://edu-mantra-backend-1.onrender.com/api/",
        
        withCredentials: true,
        
   });
   export default axiosInstance;





