import React, { useState } from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { useParams } from 'react-router-dom'

const EditItem = ({categoryId, itemId, onEdit}) => {

    const {menuId} = useParams()

    const [item, setItem] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
    })


    const handleEdit = (e) => {
        e.preventDefault()

        sendPutRequest(`/content/item/${menuId}/${categoryId}/${itemId}`, {
            name: item.name !== '' ? item.name : undefined,
            price: item.price !== '' ? item.price : undefined,
            description: item.description !== '' ? item.description : undefined,
            image: item.image !== '' ? item.image : undefined,
        }, (response) => {
            if(response.error){
                console.log(response.error)
            }else {
                console.log(response)
                onEdit()
            }
        })
    }


  return (
    <div>
        <form onSubmit={(e) => {handleEdit(e)}}>
            <input type="text" placeholder='name' onChange={(e) => setItem({...item, name: e.target.value})}  />
            <input type="number" placeholder='price' onChange={(e) => setItem({...item, price: e.target.value})}  />
            <input type="text" placeholder='description' onChange={(e) => setItem({...item, description: e.target.value})}  />

            <button>Edit Item</button>
        </form>
    </div>
  )
}

export default EditItem
