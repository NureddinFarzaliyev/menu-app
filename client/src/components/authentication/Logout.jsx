import React from 'react'
import { sendGetRequest } from '../../utils/sendGetRequest'

const Logout = () => {

  const logout = () => {
    sendGetRequest('/auth/logout', (res) => {
      if(res.loggedOut) {
        window.location.href = '/auth'
      }
    })
  }

  return (
    <div>
      <button onClick={() => {logout()}} >  LOGOUT </button>
    </div>
  )
}

export default Logout
