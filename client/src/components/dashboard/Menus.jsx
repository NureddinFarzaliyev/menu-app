import React, { useEffect, useState } from 'react'
import UserMenus from './UserMenus'
import CreateMenu from './CreateMenu'
import { sendGetRequest } from '../../utils/sendGetRequest'

const Menus = () => {

    const [menus, setMenus] = useState([])

    const fetchMenus = () => {
        sendGetRequest('/menus', (response) => {
            if(response.error){
                console.log(response.error)
                return
            }
            if(response.menus){
                console.log(response.menus)
                setMenus(response.menus)
            }
        })
    }

    useEffect(() => {
        fetchMenus()
    }, [])

  return (
    <div>
        <CreateMenu onCreate={fetchMenus} />
        <UserMenus menus={menus} />
    </div>
  )
}

export default Menus
