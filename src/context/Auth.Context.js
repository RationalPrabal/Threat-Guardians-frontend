import { createContext, useState } from 'react'
export const AuthContext = createContext()
export default function AuthContextProvider({children}) {
    const [isAuth,setAuth]=useState(false)

    return (
        <div>
          <AuthContext.Provider
            value={{
              isAuth,
              setAuth
            }}
          >
            {children}
          </AuthContext.Provider>
        </div>
      );
  
}
