import axios from "axios";
import React, { useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

export default function EmailCodeVerification() {
   const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate=useNavigate()

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    
    if (e.key === "Backspace") {
      if (code[index] === "") {
        if (index > 0) {
          const newCode = [...code];
          newCode[index - 1] = "";
          setCode(newCode);
          document.getElementById(`code-input-${index - 1}`).focus();
        }
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const  handleSubmit = async() => {
    const enteredCode = code.join("");
     console.log(enteredCode)
    if (enteredCode.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      setSuccess("");
    } else {
     try{
     const {data}= await axios.post(backendUrl+"/api/auth/verifyemail",{otp:enteredCode})
     console.log(data)
     if(data.success){
      swal('✅ Verified!', `${data.message}`);
      navigate("/")


     }
     else{
     swal('❌ Invalid Code', 'Please try again.', 'error');



     }

     }catch(err){
      console.log(err)



     }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Enter 6-digit Code</h2>
        <p className="text-gray-500 mb-6 text-center">Please check your email and enter the 6-digit verification code.</p>
        <div className="flex justify-center gap-2 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2 text-center">{success}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
