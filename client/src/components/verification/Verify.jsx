import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { sendPostRequest } from '../../utils/sendPostRequest'

const Verify = () => {
    const {token} = useParams()

    const [verificationMessage, setVerificationMessage] = useState('pending')

    const changeVerificationMessage = (verificationResponse) => {
        setVerificationMessage(verificationResponse.message)
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
