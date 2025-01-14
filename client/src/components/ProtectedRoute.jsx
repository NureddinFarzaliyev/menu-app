import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({children}) => {

    const [isLoggedIn, isVerified] = useContext(AuthContext)

    console.log(isLoggedIn, isVerified)

    if(isLoggedIn === "pending" || isVerified === "pending") {
        return "Loading..."
    }else if(isLoggedIn === false) {
        return <Navigate to={'/auth'} />
    }
    else if(isVerified === false && isLoggedIn === true) {
        return <Navigate to={'/not-verified'} />
    }
    else if(isVerified === true && isLoggedIn === true) {
        return children
    }else{
        return "?"
    }

}

export default ProtectedRoute