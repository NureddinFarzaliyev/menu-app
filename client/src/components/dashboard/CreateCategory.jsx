import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { sendPostRequest } from '../../utils/sendPostRequest'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const CreateCategory = ({onCreate}) => {
    const {menuId} = useParams()
    const [categoryName, setCategoryName] = useState('')

    const afterCreate = () => {
        onCreate()
        setCategoryName('')
    }

    const handleCreateCategory = (e) => {
        e.preventDefault()
        sendPostRequest(`/content/category/${menuId}`, {category: categoryName}, (res) => defaultResponseHandler(res, afterCreate))
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
