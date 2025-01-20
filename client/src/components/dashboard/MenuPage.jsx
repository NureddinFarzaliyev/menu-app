import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { sendGetRequest } from '../../utils/sendGetRequest'
import DeleteMenu from './DeleteMenu'
import EditMenu from './EditMenu'
import CreateCategory from './CreateCategory'
import Categories from './Categories'
import CreateItem from './CreateItem'
import UploadMenuImage from '../upload/UploadMenuImage'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'
import ShareMenu from './ShareMenu'

const MenuPage = () => {
    const {menuId} = useParams()
    const [menu, setMenu] = useState({})

    const fetchMenu = () => {
      sendGetRequest(`/menus/${menuId}`, (res) => defaultResponseHandler(res, (res) => {setMenu(res.menu)}))
    }

    useEffect(() => {
        fetchMenu()
    }, [menuId])

  return (
    <div>
      <Link to={'/dashboard'}>Go Back</Link>
      <h1>
        {menu.name}
      </h1>
      <div>
        {menuId}
      </div>
      {menu.imageUrl && <img src={menu.imageUrl} alt="Logo" style={{width: "300px"}} />}

        <DeleteMenu />
        <EditMenu onEdit={fetchMenu} />
        <UploadMenuImage onSave={fetchMenu} />
        <ShareMenu onEdit={fetchMenu} menuData={menu} />


        <CreateCategory onCreate={fetchMenu} />
        <Categories menu={menu} onEdit={fetchMenu} />

        <CreateItem onCreate={fetchMenu} categories={menu.categories} />
    </div>
  )
}

export default MenuPage
