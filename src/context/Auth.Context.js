import axios from 'axios'
import { createContext, useState } from 'react'
export const AuthContext = createContext()
export default function AuthContextProvider({children}) {
    const [isAuth,setAuth]=useState(false)
    const [user,setUser]=useState(null)
    const [show,setShow]=useState("Lectures")
    //! when page is first time mounitng or being refreshed then get the user data
    const getUser = async () => {
      let id = localStorage.getItem("userId");
      try {
        let user = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`);
        setUser(user.data);
      } catch (error) {}
    };
    //! auth context provider is providing some info which are being used across the application
    return (
        <div>
          <AuthContext.Provider
            value={{
              isAuth,
              setAuth, show,setShow,user,setUser,getUser
            }}
          >
            {children}
          </AuthContext.Provider>
        </div>
      );
  
}
