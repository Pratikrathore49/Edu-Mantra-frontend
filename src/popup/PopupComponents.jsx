// import { useEffect } from "react";
// import {  useDispatch } from "react-redux";
// import { handleCloseModlePopup } from "../redux/model/modelSlice.js";
  


// export const SuccessPopup = ({ message }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       dispatch(handleCloseModlePopup());
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [dispatch]);

//   return (
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="min-w-[300px] min-h-[200px] flex px-6 flex-col justify-center items-center 
//                  rounded-2xl shadow-xl border border-green-500 bg-green-100"
//     >
//       <h2 className="text-2xl font-bold mb-3 text-green-700">{message}</h2>

//       <button
//         onClick={() => dispatch(handleCloseModlePopup())}
//         className="px-4 py-2 rounded-lg font-medium text-white bg-green-600 
//                    hover:bg-green-700 hover:scale-95"
//       >
//         Close
//       </button>
//     </div>
//   );
// };



// export const FailurePopup = ({ message }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       dispatch(handleCloseModlePopup());
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [dispatch]);

//   return (
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="min-w-[300px] min-h-[200px] flex px-6 flex-col justify-center items-center 
//                  rounded-2xl shadow-xl border border-red-500 bg-red-100"
//     >
//       <h2 className="text-2xl font-bold mb-3 text-red-700">{message}</h2>

//       <button
//         onClick={() => dispatch(handleCloseModlePopup())}
//         className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 
//                    hover:bg-red-700 hover:scale-95"
//       >
//         Close
//       </button>
//     </div>
//   );
// };
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleCloseModlePopup } from "../redux/model/modelSlice.js";
import { logoutUserAsync } from "../redux/auth/authSlice.js";

// ✅ Shared popup base style
const popupBase =
  "min-w-[320px] min-h-[200px] flex flex-col justify-center items-center px-6 py-6 rounded-3xl shadow-2xl backdrop-blur-md bg-opacity-90 transform transition-all duration-300 scale-100 hover:scale-[1.02]";

// ✅ Success Popup
export const SuccessPopup = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(handleCloseModlePopup());
    }, 2000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${popupBase} bg-green-50 border border-green-400`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-green-100 border-2 border-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-green-700">{message}</h2>

        <button
          onClick={() => dispatch(handleCloseModlePopup())}
          className="mt-4 px-5 py-2 rounded-full font-medium text-white bg-green-600 hover:bg-green-700 active:scale-95 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// ✅ Failure Popup
export const FailurePopup = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(handleCloseModlePopup());
    }, 2000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${popupBase} bg-red-50 border border-red-400`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-100 border-2 border-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-red-700">{message}</h2>

        <button
          onClick={() => dispatch(handleCloseModlePopup())}
          className="mt-4 px-5 py-2 rounded-full font-medium text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};




export const ConfirmPopup = ({ message}) => {
  const dispatch = useDispatch();

 
  const handleCancel = () => {
    dispatch(handleCloseModlePopup());
  };

  
  const handleConfirm = () => {
    dispatch(logoutUserAsync())
    dispatch(handleCloseModlePopup());
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="min-w-[320px] min-h-[220px] flex flex-col justify-center items-center 
                 px-6 py-6 rounded-3xl shadow-2xl border border-yellow-400 
                 bg-yellow-50 backdrop-blur-md bg-opacity-90 transition-all 
                 duration-300 transform hover:scale-[1.02]"
    >
      {/* ⚠️ Icon */}
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-yellow-100 border-2 border-yellow-500 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z"
          />
        </svg>
      </div>

      {/* 🧠 Message */}
      <h2 className="text-xl font-semibold text-yellow-800 text-center mb-5">
        {message || "Are you sure you want to proceed?"}
      </h2>

      {/* 🔘 Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleCancel}
          className="px-5 py-2 rounded-full font-medium text-gray-700 bg-gray-200 
                     hover:bg-gray-300 active:scale-95 transition-all"
        >
          Cancel
        </button>

        <button
          onClick={handleConfirm}
          className="px-5 py-2 rounded-full font-medium text-white bg-yellow-600 
                     hover:bg-yellow-700 active:scale-95 transition-all"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
