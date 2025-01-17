import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { sendGetRequest } from '../../utils/sendGetRequest'
import DeleteMenu from './DeleteMenu'
import EditMenu from './EditMenu'
import UploadImage from '../upload/Upload'

const MenuPage = () => {
    const {menuId} = useParams()
    const [menu, setMenu] = useState({})

    const fetchMenu = () => {
        sendGetRequest(`/menus/${menuId}`, (response) => {
            if(response.error){
                console.log(response.error)
                return
            }
            if(response.success){
                console.log(response.menu)
                setMenu(response.menu)
            }
        })
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
      {menu.logo && <img src={menu.logo} alt="Logo" style={{width: "300px"}} />}

        <DeleteMenu />
        <EditMenu onEdit={fetchMenu} />

        <UploadImage saveTo={`/menus/${menuId}`} onSave={fetchMenu} />
    </div>
  )
}

export default MenuPage
