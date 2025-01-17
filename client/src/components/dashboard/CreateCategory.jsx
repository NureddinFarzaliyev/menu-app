import React, { useState } from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { useParams } from 'react-router-dom'
import { sendPostRequest } from '../../utils/sendPostRequest'

const CreateCategory = ({onCreate}) => {

    const {menuId} = useParams()

    const [categoryName, setCategoryName] = useState('')

    const handleCreateCategory = (e) => {
        e.preventDefault()
        sendPostRequest(`/content/category/${menuId}`, {category: categoryName}, (response) => {
            if(response.error){
                console.log(response.error)
            }else{
                onCreate()
                console.log(response)
                setCategoryName('')
            }
        })
    }


  return (
    <div>
        <form onSubmit={(e) => {handleCreateCategory(e)}}>
            <h1>Create category</h1>
            <input value={categoryName} type="text" onChange={(e) => setCategoryName(e.target.value)} />
            <button type='submit'>Create Category</button>
        </form>
    </div>
  )
}

export default CreateCategory
