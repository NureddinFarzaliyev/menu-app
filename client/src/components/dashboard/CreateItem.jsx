import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { sendPostRequest } from '../../utils/sendPostRequest'
import { useCloudinary } from '../../utils/useCloudinary'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const CreateItem = ({onCreate, categories}) => {
    const [item, setItem] = useState({
        name: '',
        price: '',
        description: '',
    })
    const [category, setCategory] = useState('')
    const {menuId} = useParams()
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const {uploadToCloudinary} = useCloudinary()

    const afterCreate = () => {
        onCreate()
        fileInputRef.current.value = ''
        setItem({
            name: '',
            price: '',
            description: '',
            imageUrl: ''
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let imageUrl = ''
        if(file) imageUrl = await uploadToCloudinary(file);

        sendPostRequest(`/content/item/${menuId}/${category}`, {...item, imageUrl, category}, (res) => defaultResponseHandler(res, afterCreate))
    }

    useEffect(() => {
        if(categories && categories.length > 0) setCategory(categories[0]._id)
    }, [categories])

    return (
        <div>
            <h1>Create Item</h1>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <input value={item.name} type="text" placeholder='name' onChange={(e) => setItem({...item, name: e.target.value})} />
                <input value={item.price} type="number" placeholder='price' onChange={(e) => setItem({...item, price: e.target.value})} />
                <input value={item.description} type="text" placeholder='description' onChange={(e) => setItem({...item, description: e.target.value})} />
                <input type="file" ref={fileInputRef} onChange={(e) => {setFile(e.target.files[0])}} />
                <select value={item.category} onChange={(e) => setCategory(e.target.value)}>
                    {categories && categories.map((category) => {
                        return <option key={category._id} value={category._id}>{category.name}</option>
                    })}
                </select>
                <button type='submit'>Create Item</button>
            </form>
        </div>
    )
}

export default CreateItem
