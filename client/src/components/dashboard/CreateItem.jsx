import React, { useState } from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { useParams } from 'react-router-dom'

const CreateItem = ({onCreate, categories}) => {

    const [item, setItem] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    })

    const {menuId} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        sendPutRequest(`/menus/${menuId}`, {content: item}, (response) => {
            if(response.error){
                console.log(error)
            }else{
                console.log(response)
                onCreate()
                setItem({
                    name: '',
                    price: '',
                    description: '',
                    category: ''
                })
            }
        })
    }

  return (
    <div>

        <h1>Create Item</h1>

        <form onSubmit={(e) => {handleSubmit(e)}}>

            <input value={item.name} type="text" placeholder='name' onChange={(e) => setItem({...item, name: e.target.value})} />
            <input value={item.price} type="number" placeholder='price' onChange={(e) => setItem({...item, price: e.target.value})} />
            <input value={item.description} type="text" placeholder='description' onChange={(e) => setItem({...item, description: e.target.value})} />

            <select value={item.category} onChange={(e) => setItem({...item, category: e.target.value})}>
                Select Category
                {categories && categories.map((category, i) => {
                    return <option key={i} value={category.name}>{category.name}</option>
                })}
            </select>
            
            <button type='submit'>Create Item</button>

        </form>
      
    </div>
  )
}

export default CreateItem
