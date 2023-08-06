import axios from 'axios'
import { createContext, useState } from 'react'
export const AuthContext = createContext()
export default function AuthContextProvider({children}) {
    const [isAuth,setAuth]=useState(false)
    const [user,setUser]=useState(null)
    const [show,setShow]=useState("Lectures")
    const getUser = async () => {
      let id = localStorage.getItem("userId");
      try {
        let user = await axios.get(`http://localhost:4500/users/${id}`);
        setUser(user.data);
      } catch (error) {}
    };
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
