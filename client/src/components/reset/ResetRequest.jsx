import { useState } from 'react'
import { sendPostRequest } from '../../utils/sendPostRequest'

const ResetRequest = () => {

    const [email, setEmail] = useState('')

    const handleReset = (e) => {
        e.preventDefault()
        sendPostRequest('/auth/reset', {email}, console.log)
    }

  return (
    <div>
      <form onSubmit={(e) => {handleReset(e)}}>
        <h1>Reset password</h1>
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <button type='submit'>reset</button>
      </form>
    </div>
  )
}

export default ResetRequest
