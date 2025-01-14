import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { sendPostRequest } from '../../utils/sendPostRequest'

const Verify = () => {
    const {token} = useParams()

    const [verificationMessage, setVerificationMessage] = useState('pending')

    const changeVerificationMessage = (verificationResponse) => {
      // TODO: Handle errors
      if(verificationResponse.error){
        setVerificationMessage(`Error: ${verificationResponse.error}`)
      }else{
        setVerificationMessage(verificationResponse.message)
      }
    }

    useEffect(() => {
        sendPostRequest('/auth/verify', {token}, changeVerificationMessage)
    }, [token])

  return (
    <div>
        {verificationMessage}
    </div>
  )
}

export default Verify
