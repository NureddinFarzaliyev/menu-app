import React from 'react'
import { sendDeleteRequest } from '../../utils/sendDeleteRequest'
import { useParams } from 'react-router-dom'

const DeleteCategory = ({categoryId, onDelete}) => {

    const {menuId} = useParams()

    const handleCategoryDelete = (e) => {
        e.preventDefault()
        sendDeleteRequest(`/content/category/${menuId}/${categoryId}`, (response) => {
            if(response.error){
                console.log(response.error)
            }else{
                console.log(response)
                onDelete()
            }
        })
    }

  return (
    <button onClick={(e) => {handleCategoryDelete(e)}}>DELETE</button>
  )
}

export default DeleteCategory
