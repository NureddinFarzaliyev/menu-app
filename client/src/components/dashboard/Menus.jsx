import React, { useEffect, useState } from 'react'
import UserMenus from './UserMenus'
import CreateMenu from './CreateMenu'
import { sendGetRequest } from '../../utils/sendGetRequest'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const Menus = () => {
    const [menus, setMenus] = useState(null)

    const fetchMenus = () => {
        sendGetRequest('/menus', (res) => defaultResponseHandler(res, (res) => setMenus(res.menus)))
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
