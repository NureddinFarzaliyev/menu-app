import React, { useState } from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { useParams } from 'react-router-dom'

const EditMenu = ({onEdit}) => {

    const {menuId} = useParams()

    const [newName, setNewName] = useState('')

    const handleEdit = (e) => {
        e.preventDefault()
        
        sendPutRequest(`/menus/${menuId}`, {name: newName}, (response) => {
            if(response.error){
                console.log(response.error)
                return
            }
            if(response.success){
                console.log(response)
                onEdit()
            }
        })
    }

  return (
    <div>
        <h1>edit menu</h1>
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button onClick={(e) => {handleEdit(e)}}>Edit menu</button>
    </div>
  )
}

export default EditMenu
