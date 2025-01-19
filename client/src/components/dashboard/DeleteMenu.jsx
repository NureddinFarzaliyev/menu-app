import React from 'react'
import { sendDeleteRequest } from '../../utils/sendDeleteRequest'
import { useParams } from 'react-router-dom'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const DeleteMenu = () => {
    const {menuId} = useParams()

    const onDelete = () => {
      window.location.href = '/dashboard'
    }

    const handleDelete = () => {
      sendDeleteRequest(`/menus/${menuId}`, (res) => defaultResponseHandler(res, onDelete))
    }

  return (
    <div>
      <h1>delete menu</h1>
      <button onClick={handleDelete}>DELETE</button>
    </div>
  )
}

export default DeleteMenu
