import React from 'react'
import { sendDeleteRequest } from '../../utils/sendDeleteRequest'
import { useParams } from 'react-router-dom'

const DeleteItem = ({onDelete, categoryId, itemId}) => {

    const {menuId} = useParams()

    const handleDelete = (e) => {
        e.preventDefault()
        sendDeleteRequest(`/content/item/${menuId}/${categoryId}/${itemId}`, (response) => {
            if(response.error){
                console.log(response.error)
            }else{
                console.log(response.message)
                onDelete()
            }
        })
    }

  return (
    <button onClick={(e) => {handleDelete(e)}}>Delete Item</button>
  )
}

export default DeleteItem
