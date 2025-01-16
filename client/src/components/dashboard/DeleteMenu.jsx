import React from 'react'
import { sendDeleteRequest } from '../../utils/sendDeleteRequest'
import { useParams } from 'react-router-dom'

const DeleteMenu = () => {

    const {menuId} = useParams()

    const handleDelete = () => {
        sendDeleteRequest(`/menus/${menuId}`, (response) => {
            if(response.error){
                console.log(response.error)
                return
            }
            if(response.success){
                console.log(response.message)
                window.location.href = '/dashboard'
            }
        })
    }

  return (
    <div>
      <h1>delete menu</h1>
      <button onClick={handleDelete}>DELETE</button>
    </div>
  )
}

export default DeleteMenu
