import React, { useRef, useState } from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { useParams } from 'react-router-dom'
import { useCloudinary } from '../../utils/useCloudinary'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const EditItem = ({categoryId, itemId, onEdit}) => {
    const {menuId} = useParams()
    const [item, setItem] = useState({
        name: '',
        price: '',
        description: '',
    })
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const {uploadToCloudinary} = useCloudinary();
    
    const handleEdit = async (e) => {
        e.preventDefault()
        
        let imageUrl = ''
        if(file) imageUrl = await uploadToCloudinary(file);

        sendPutRequest(`/content/item/${menuId}/${categoryId}/${itemId}`, {
            name: item.name !== '' ? item.name : undefined,
            price: item.price !== '' ? item.price : undefined,
            description: item.description !== '' ? item.description : undefined,
            imageUrl: imageUrl !== '' ? imageUrl : undefined,
        }, (response) => defaultResponseHandler(response, onEdit))
    }

    const handleImageDelete = (e) => {
        e.preventDefault()
        sendPutRequest(`/content/item/${menuId}/${categoryId}/${itemId}`, {
            imageUrl: ''
        }, (response) => defaultResponseHandler(response, onEdit))
    }

  return (
    <div>
        <form onSubmit={(e) => {handleEdit(e)}}>
            <input type="text" placeholder='name' onChange={(e) => setItem({...item, name: e.target.value})}  />
            <input type="number" placeholder='price' onChange={(e) => setItem({...item, price: e.target.value})}  />
            <input type="text" placeholder='description' onChange={(e) => setItem({...item, description: e.target.value})}  />
            <input type="file" ref={fileInputRef} onChange={(e) => {setFile(e.target.files[0])}} />
            <button>Edit Item</button>
            <button type='button' onClick={(e) => {handleImageDelete(e)}}>Delete Image</button>
        </form>
    </div>
  )
}

export default EditItem
