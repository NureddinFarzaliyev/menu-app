import React, { useEffect, useState } from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'

const ShareMenu = ({onEdit, menuData}) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        if(menuData?.url) {
            setUrl(menuData.url)
        }
    }, [menuData])

    const handleShare = () => {
        sendPutRequest(`/menus/${menuData._id}`, {url}, (res) => {defaultResponseHandler(res, onEdit)})
    } 

    const handlePrivate = () => {
        sendPutRequest(`/menus/${menuData._id}`, {url: null}, (res) => {defaultResponseHandler(res, onEdit)})
    }

  return (
    <div>
        <h1>Share Menu</h1>

        {menuData?.url ? (
            <p>Menu is shared with the url: {menuData.url}</p>
        ) : (
            <p>Menu is not public. Write the url below and share the menu.</p>
        )}

        <input value={url} onChange={(e) => {setUrl(e.target.value)}} type="text" placeholder='URL to share' />
        <button onClick={handleShare}>{menuData?.url ? "Change URL" : "Share"}</button>
        {menuData?.url && <button onClick={handlePrivate}>Make Private</button>}
    </div>
  )
}

export default ShareMenu
