import React, { useState } from 'react'
import { sendPostRequest } from '../../utils/sendPostRequest'

const Signup = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  // TODO: combine this logic with signip
  const checkIfLoggedIn = (response) => {
    if(response.error){
        console.log(response.error)
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
  const handleSignup = (e) => {
    e.preventDefault()
    sendPostRequest('/auth/signup', {email: data.email, password: data.password}, checkIfLoggedIn)
  }

  return (
    <div>
      <form onSubmit={(e) => {handleSignup(e)}}>
          <h1>Signup</h1>
        <input type="text" name='email' placeholder='email' onChange={(e) => {setData({...data, email: e.target.value})}} />       
        <input type="password" name='password' placeholder='pass' onChange={(e) => {setData({...data, password: e.target.value})}} /> 
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default Signup
