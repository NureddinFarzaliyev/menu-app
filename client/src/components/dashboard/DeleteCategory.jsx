import React from 'react'
import { sendDeleteRequest } from '../../utils/sendDeleteRequest'
import { useParams } from 'react-router-dom'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const DeleteCategory = ({categoryId, onDelete}) => {
    const {menuId} = useParams()

    const handleCategoryDelete = (e) => {
        e.preventDefault()
        sendDeleteRequest(`/content/category/${menuId}/${categoryId}`, (res) => defaultResponseHandler(res, onDelete))
    }

  return (
    <button onClick={(e) => {handleCategoryDelete(e)}}>Delete Category</button>
  )
}

export default DeleteCategory