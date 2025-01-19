import React from 'react'
import { sendDeleteRequest } from '../../utils/sendDeleteRequest'
import { useParams } from 'react-router-dom'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const DeleteItem = ({onDelete, categoryId, itemId}) => {
    const {menuId} = useParams()

    const handleDelete = (e) => {
        e.preventDefault()
        sendDeleteRequest(`/content/item/${menuId}/${categoryId}/${itemId}`, (res) => defaultResponseHandler(res, onDelete))
    }

  return (
    <button onClick={(e) => {handleDelete(e)}}>Delete Item</button>
  )
}

export default DeleteItem
