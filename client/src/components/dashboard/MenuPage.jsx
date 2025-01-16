import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { sendGetRequest } from '../../utils/sendGetRequest'
import DeleteMenu from './DeleteMenu'
import EditMenu from './EditMenu'

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
      <h1>
        {menu.name}
      </h1>
      {menuId}

        <DeleteMenu />
        <EditMenu onEdit={fetchMenu} />
    </div>
  )
}

export default MenuPage
