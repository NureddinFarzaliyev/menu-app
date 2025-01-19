import React from 'react'
import { useState } from 'react'
import { sendPostRequest } from '../../utils/sendPostRequest'
import { useParams } from 'react-router-dom'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const {token} = useParams()

    const handleReset = (e) => {
      e.preventDefault()
      sendPostRequest(`/auth/reset/${token}`, {password}, (res) => defaultResponseHandler(res, (res) => {
        if(res.success){
          window.location.href = '/auth'
        }
      }))
    }

  return (
    <div>
        <form onSubmit={(e) => {handleReset(e)}}>
            <h1>Type new password</h1>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>change</button>
        </form>
    </div>
  )
}

export default ResetPassword
