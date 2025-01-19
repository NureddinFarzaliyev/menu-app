import React, { useState } from 'react'
import { sendPostRequest } from '../../utils/sendPostRequest'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const CreateMenu = ({onCreate}) => {
    const [menuName, setMenuName] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        sendPostRequest('/menus', {name: menuName}, (res) => defaultResponseHandler(res, () => {setMenuName(''); onCreate()}))
    }

  return (
    <div>
      <input type="text" onChange={(e) => {setMenuName(e.target.value)}} />
      <button onClick={(e) => {handleClick(e)}}>Create Menu</button>
    </div>
  )
}

export default CreateMenu
