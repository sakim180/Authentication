import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { setIsLogedin, backendUrl, getUserData } = useContext(AppContext);

  const [state, setState] = useState("sign-in"); // fixed: match logic
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dataHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    axios.defaults.withCredentials = true;

    try {
      if (state === "sign-up") {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/register`,
          { name, email, password },
          { withCredentials: true }
        );

        setLoader(false);

        if (data.success) {
          swal("Success", "Account created! Please log in.", "success");
          setState("sign-in");
        } else {
          swal("Error", data.message || "Registration failed.", "error");
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        );

        setLoader(false);

        if (data.success) {
          setIsLogedin("true");
          await getUserData(); // optional await if it's async
          navigate("/");
          swal("Welcome!", "You are now logged in.", "success");
        } else {
          swal("Error", data.message || "Login failed.", "error");
        }
      }
    } catch (err) {
      setLoader(false);
      const message =
        err.response?.data?.message || err.message || "Something went wrong.";
      swal("Error", message, "error");
    }
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center min-h-screen bg-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-slate-100 min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
          <div>
            <form
              onSubmit={dataHandler}
              className="flex flex-col w-72 shadow-xl p-5 bg-white rounded-md gap-2"
            >
              {state === "sign-up" ? (
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-center text-3xl font-bold">Create Account</h1>
                  <h3 className="text-sm text-gray-600">Create your account</h3>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mb-5">
                  <h1 className="text-center text-4xl font-bold">Log In</h1>
                </div>
              )}

              {state === "sign-up" && (
                <div className="flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5">
                  <img src={assets.person_icon} alt="person" />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    name="fullname"
                    className="bg-transparent outline-none rounded-full text-white w-full"
                    type="text"
                    placeholder="Name"
                    required
                  />
                </div>
              )}

              <div className="flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5">
                <img src={assets.mail_icon} alt="mail" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="bg-transparent outline-none rounded-full text-white w-full"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5">
                <img src={assets.lock_icon} alt="lock" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none rounded-full text-white w-full"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              <p
                className="text-violet-800 text-sm text-right cursor-pointer"
                onClick={() => navigate("/forgot-pass")}
              >
                Forgot password?
              </p>

              <button
                type="submit"
                className="bg-blue-500 text-white px-3 rounded-md py-2.5 hover:bg-blue-600 transition"
              >
                {state === "sign-up" ? "Sign Up" : "Sign In"}
              </button>

              {state === "sign-up" ? (
                <p className="text-sm text-center">
                  Already have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setState("sign-in")}
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-sm text-center">
                  Don't have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setState("sign-up")}
                  >
                    Sign Up
                  </span>
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
