
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router";

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate()
  const handlePayment = async () => {
    const { data } = await axiosInstance.post(
      "v2/payment/create-order",
      { amount }
    );

    const options = {
      key: "rzp_test_RdcGxpdnan4YD8",
      order_id: data.id,
      amount: data.amount,
      name: "Test Paper Purchase",
      description: "Premium Test Paper Access",

      handler: async function (response) {
        const verify = await axiosInstance.post(
          "v2/payment/verify-payment",
          response
        );
        alert(
          verify.data.status === "success"
            ? "Payment Success ✅"
            : "Payment Failed ❌"
        );
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(()=>{
   async function temp(){
    try{
      const res = await axiosInstance.get('/v2/paper/isPurchase')   
      if(res.data.access === true){
        navigate('/student/papers')
      } 
      console.log('api response',res + 'res'+res.data.access)
    }catch(error){
       console.log(error.message)
    }
}
temp()
  },[])


  return (
    <div className="flex justify-center px-6 mt-10">
      <div className="w-full max-w-sm bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl p-7">

        {/* Title */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
          Premium Test Paper
        </h1>

        <p className="text-gray-600 text-center mt-2 text-sm">
          Unlock full test paper access by purchasing the course.
        </p>

        {/* Features */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            ✅ High-quality PDF
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            ✅ Exam-oriented questions
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            ✅ Instant access after payment
          </div>
        </div>

        {/* Amount Input */}
        <div className="mt-6">
          <input
            type="number"
            placeholder="Enter amount ₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handlePayment}
          className="w-full mt-5 py-3 rounded-xl text-white font-semibold text-lg shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
        >
          Buy Now
        </button>

      </div>
    </div>
  );
};

export default PaymentPage;
