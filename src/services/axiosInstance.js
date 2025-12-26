   import axios from "axios";
   const axiosInstance = axios.create({
        baseURL:"https://edu-mantra-backend.onrender.com/api/",
     //    baseURL:"http://localhost:4400/api/",         
        withCredentials: true,
        
   });
   export default axiosInstance;





