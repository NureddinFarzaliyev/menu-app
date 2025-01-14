import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Login from './Login'
import Signup from '../verification/Signup'
import { AuthContext } from '../../context/AuthContext'
import ResetRequest from '../reset/ResetRequest'

const Auth = () => {
    const [isLoggedIn] = useContext(AuthContext)

    if(isLoggedIn === false){
        return(
            <>
                <Login />
                <ResetRequest />
                <Signup />
            </>
        )
    }
    else{
        return(
            <Navigate to="/dashboard" />
        )
    }
}

export default Auth
