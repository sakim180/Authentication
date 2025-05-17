import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const navigate=useNavigate();
   const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      swal("Error", "Please enter a valid email address.", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/auth/pass-reset-otp`, {
        email,
      });
      setLoading(false);

      if (response.data.success) {
        swal("Success", "OTP sent to your email!", "success");
        navigate("/reset-pass")
        na
      } else {
        swal("Error", response.data.message || "Failed to send OTP", "error");
      }
    } catch (error) {
      setLoading(false);
      swal("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex justify-center items-center">
      <form
        onSubmit={handleSendOtp}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Enter your Email</h2>

        <input
          type="email"
          placeholder="example@gmail.com"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
        
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
