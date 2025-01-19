import React from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { useParams } from 'react-router-dom'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const EditCategory = ({category, onEdit}) => {
    const {menuId} = useParams()

    const editCategoryHandler = (e, categoryId) => {
      e.preventDefault()
      sendPutRequest(`/content/category/${menuId}/${categoryId}`, {category: e.target[0].value}, (res) => defaultResponseHandler(res, onEdit))
    }

  return (
    <form onSubmit={(e) => editCategoryHandler(e, category._id)}>
      <input type="text" placeholder='change name' />
      <button>Edit</button>
    </form>
  )
}

export default EditCategory