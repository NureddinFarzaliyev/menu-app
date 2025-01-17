import React from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { useParams } from 'react-router-dom'

const EditCategory = ({category, onEdit}) => {

    const {menuId} = useParams()

    const editCategoryHandler = (e, categoryId) => {
        e.preventDefault()
        console.log('edit category')
    
        sendPutRequest(`/content/category/${menuId}/${categoryId}`, {category: e.target[0].value}, (response) => {
          if(response.error){
            console.log(response.error)
          }else{
            onEdit()
            console.log(response)
          }})
      }

  return (
    <form onSubmit={(e) => editCategoryHandler(e, category._id)}>
        <input type="text" placeholder='change name' />
        <button>Edit</button>
    </form>
  )
}

export default EditCategory
