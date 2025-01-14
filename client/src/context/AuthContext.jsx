import { createContext, useEffect, useState } from "react";
import { sendGetRequest } from "../utils/sendGetRequest";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState("pending")
    const [isVerified, setIsVerified] = useState("pending")

    const changeIsLoggedIn = (response) => {
        setIsLoggedIn(response.authorized ? true : false)
        setIsVerified(response.verified ? true : false)
    }

    useEffect(() => {
        sendGetRequest('/auth/check', changeIsLoggedIn)
        console.log("contect send a request")
    }, [])

    return (
        <AuthContext.Provider value={[isLoggedIn, isVerified, setIsLoggedIn, setIsVerified]}>
            {children}
        </AuthContext.Provider>
    )
}

