import { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { handleCloseModlePopup } from "../redux/model/modelSlice.js";
  


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
      className="min-w-[300px] min-h-[200px] flex px-6 flex-col justify-center items-center 
                 rounded-2xl shadow-xl border border-green-500 bg-green-100"
    >
      <h2 className="text-2xl font-bold mb-3 text-green-700">{message}</h2>

      <button
        onClick={() => dispatch(handleCloseModlePopup())}
        className="px-4 py-2 rounded-lg font-medium text-white bg-green-600 
                   hover:bg-green-700 hover:scale-95"
      >
        Close
      </button>
    </div>
  );
};



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
      className="min-w-[300px] min-h-[200px] flex px-6 flex-col justify-center items-center 
                 rounded-2xl shadow-xl border border-red-500 bg-red-100"
    >
      <h2 className="text-2xl font-bold mb-3 text-red-700">{message}</h2>

      <button
        onClick={() => dispatch(handleCloseModlePopup())}
        className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 
                   hover:bg-red-700 hover:scale-95"
      >
        Close
      </button>
    </div>
  );
};