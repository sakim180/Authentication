import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const { setIsLogedin, backendUrl,getUserData } = useContext(AppContext);

  const [state, setState] = useState("sign-up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dataHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "sign-up") {
        setloader(true)
        const response = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        setloader(false)
        if (response.data.success) {

          setIsLogedin("true");
          getUserData()
          setState("sign-in");
        } else {
          alert(response.data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLogedin("true");
          getUserData()
          navigate("/");
        } else {
          alert(data.message);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
    {
      loader?
      <h1 className="flex justify-center items-center">Loading...</h1>
     
     :
    
      <div className="flex justify-center items-center bg-slate-100 min-h-screen rounded-md bg-gradient-to-br from-blue-200 to-purple-400">
        <div>
          <form
            onSubmit={dataHandler}
            action=""
            className=" flex flex-col w-72 shadow-xl p-5 bg-white rounded-md gap-2"
          >
            {state === "sign-up" ? (
              <div className="flex flex-col items-center justify-center">
                {" "}
                <h1 className="text-center text-3xl font-bold">
                  Create Account
                </h1>
                <h3>Create your account</h3>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mb-5">
                <h1 className="text-center text-4xl font-bold">Log In</h1>
              </div>
            )}
            {state === "sign-up" && (
              <div className="flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="fullname"
                  className="bg-transparent outline-none rounded-full text-white"
                  type="text"
                  placeholder=" Name"
                  required
                />
              </div>
            )}

            <div className="flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5">
              <img src={assets.mail_icon} alt="" />
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                className="bg-transparent outline-none rounded-full text-white"
                type="email"
                placeholder=" Email"
                required
              />
            </div>

            <div className="flex items-center gap-3 bg-[#333A5C] rounded-full px-5 py-2.5">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-transparent outline-none rounded-full text-white"
                type="text"
                placeholder=" Password"
                required
              />
            </div>
            <p className="text-violet-800">Forgot password?</p>
            <button className="bg-blue-500 px-3 rounded-md py-2.5">
              {state === "sign-up" ? "Sign-up" : "Sign In"}
            </button>
            {state === "sign-up" ? (
              <p className="flex text-sm">
                Already have an account?{" "}
                <p
                  className="text-blue-600 text-sm cursor-pointer"
                  onClick={() => {
                    setState("sign-in");
                  }}
                >
                  Login here
                </p>
              </p>
            ) : (
              <p className="flex text-sm">
                Don't have an account?{" "}
                <span
                  className="text-blue-600 text-sm cursor-pointer"
                  onClick={() => {
                    setState("sign-up");
                  }}
                >
                  Sign Up
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
}
    </>
  );
};

export default Login;
