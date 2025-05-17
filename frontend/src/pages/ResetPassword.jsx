import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate=useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !otp || !newPassword || !confirmPassword) {
      swal("Error", "Please fill all the fields.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      swal("Error", "Passwords do not match.", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${backendUrl}/api/auth/new-pass-set`, {
        email,
        otp,
        newPassword,
      });

      setLoading(false);

      if (response.data.success) {
        swal("Success", "Password reset successful!", "success");
        navigate('/Login')

      } else {
        swal("Error", response.data.message || "Failed to reset password.", "error");
      }
    } catch (error) {
      setLoading(false);
      swal("Error", error.response?.data?.message || "Something went wrong.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex justify-center items-center">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Reset Password</h2>

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter OTP"
          maxLength={6}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
