import React, { useState } from 'react'
import { sendPostRequest } from '../../utils/sendPostRequest'

const Login = () => {   
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    
    // TODO: Seperate the logic
    const checkIfLoggedIn = (response) => {
        if(response.error){
            console.log(response.error.credentials ? response.error.credentials : response.error)
        }else if (response.user){
            if(response.verified){
                window.location.href = '/dashboard'
                console.log("Logged in successfully")
            }else{
                window.location.href = '/not-verified'
            }
        }
    }

    // TODO: Custom Hooks with loading state and error handling
    const handleLogin = (e) => {
        e.preventDefault()
        sendPostRequest('/auth/login', {email: data.email, password: data.password}, checkIfLoggedIn)    
    }

  return (
    <div>
        <form onSubmit={(e) => {handleLogin(e)}}>
            <h1>Login</h1>
            <input type="text" name='email' placeholder='email' onChange={(e) => {setData({...data, email: e.target.value})}} />       
            <input type="password" name='password' placeholder='password' onChange={(e) => {setData({...data, password: e.target.value})}} /> 
            <button type='submit'>Login</button>
        </form>
    </div>

  )
}

export default Login
