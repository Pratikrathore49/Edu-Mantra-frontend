import { useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router";

const PaymentPage = () => {
  const navigate = useNavigate();
  const fixedAmount = 299; // Fixed amount

  const handlePayment = async () => {
    const { data } = await axiosInstance.post(
      "v2/payment/create-order",
      { amount: fixedAmount }
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

        if (verify.data.status === "success") {
          alert("✅ Payment Successful!");
          navigate("/student/allSubPaper");
        } else {
          alert("❌ Payment Failed.Please try again.");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    async function temp() {
      try {
        const res = await axiosInstance.get("/v2/paper/isPurchase");
        if (res.data.access === true) {
          navigate("/student/allSubPaper");
        }
        console.log("api response", res + "res" + res.data.access);
      } catch (error) {
        console.log(error.message);
      }
    }
    temp();
  }, [navigate]);

  return (
    <div className="flex justify-center px-6 mt-10">
      <div className="w-full max-w-sm bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl p-7">

        {/* Title */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
          Important Test Papers
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

        {/* Button */}
        <button
          onClick={handlePayment}
          className="w-full mt-5 py-3 rounded-xl text-white font-semibold text-lg shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
        >
          Buy Now ₹299
        </button>

      </div>
    </div>
  );
};

export default PaymentPage;
