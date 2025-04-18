import axios from "axios";
import { createContext, useState } from "react";
export const AppContext=createContext()

export const AppContextProvider=({children})=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [isLogedin,setIsLogedin]=useState(false)
    const [userData,setUserData]=useState({})

    const getUserData =async()=>{
      try{
         const {data}=await axios.get(backendUrl+'/api/user/get-user-data')
         if(data.success){
         setUserData(data.userData)
         }
         else{
            alert(data.message)
         }
      }
      catch(err)
      {
         alert(err)

      }
      
      

    }
   

 const value={
    backendUrl,
    isLogedin,setIsLogedin,
    userData,setUserData,
    getUserData

 }
    return (
       < AppContext.Provider value={value}>
       
       {children}
       
       </AppContext.Provider>


    )




}
export default AppContext