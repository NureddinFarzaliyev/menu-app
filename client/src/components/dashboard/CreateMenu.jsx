import React, { useState } from 'react'
import { sendPostRequest } from '../../utils/sendPostRequest'

const CreateMenu = ({onCreate}) => {

    const [menuName, setMenuName] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        sendPostRequest('/menus', {name: menuName}, (response) => {
            if(response.error){
                console.log(response.error)
                return
            }
            if(response.success){
                console.log(response.success)
                setMenuName('')
                onCreate()
            }
        })
    }

  return (
    <div>
      
      <input type="text" onChange={(e) => {setMenuName(e.target.value)}} />
      <button onClick={(e) => {handleClick(e)}}>Create Menu</button>

    </div>
  )
}

export default CreateMenu
