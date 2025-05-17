import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLogedin, setIsLogedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLogedin(true);
        getUserData();
      }
    } catch (err) {}
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-user-data");
      if (data.success) {
        setUserData(data.userData);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.delete(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLogedin(false);
        setUserData(false);
        Navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const sendOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.get(backendUrl + "/api/auth/sendotp");
      if (data.success) {
        alert("otp send successfully");
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(()=>{
    getAuthState();
    
  },[])
  const value = {
    backendUrl,
    isLogedin,
    setIsLogedin,
    userData,
    setUserData,
    getUserData,
    logout,
    sendOtp
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
 export default AppContext


