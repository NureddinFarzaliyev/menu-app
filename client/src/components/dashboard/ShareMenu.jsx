import React, { useEffect, useState } from 'react'
import { sendPutRequest } from '../../utils/sendPutRequest'
import { defaultResponseHandler } from '../../utils/defaultResponseHandler'
import slugify from 'slugify'

const ShareMenu = ({onEdit, menuData}) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        if(menuData?.isPublic) {
            setUrl(menuData.url)
        }
    }, [menuData])

    const handleShare = () => {
        sendPutRequest(`/menus/${menuData._id}`, {isPublic: true, url}, (res) => defaultResponseHandler(res, onEdit))
    } 

    const handlePrivate = () => {
        sendPutRequest(`/menus/${menuData._id}`, {isPublic: false}, (res) => defaultResponseHandler(res, onEdit))
        setUrl('')
    }

  return (
    <div>
        <h1>Share Menu</h1>

        {menuData?.isPublic ? (
            <>
                <p>Menu is shared with the url: <a href={`/${menuData.url}`} target='_blank'>
                {`${import.meta.env.VITE_CLIENT_ORIGIN}/${menuData.url}`}</a></p>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${`${import.meta.env.VITE_CLIENT_ORIGIN}/${menuData.url}`}`} alt="" /> <br />
            </>
        ) : (
            <p>Menu is not public. Write the url below and share the menu.</p>
        )}

        <input onChange={(e) => {setUrl(slugify(e.target.value, {lower: true}))}} type="text" placeholder='URL to share' />
        <p>{menuData?.url && `Current url is ${menuData.url}`}</p>
        <p>{url && `URL will be: ${url}`}</p>
        <button onClick={handleShare}>{menuData?.isPublic ? "Change URL" : "Make Public"}</button>
        {menuData?.isPublic && <button onClick={handlePrivate}>Make Private</button>}
    </div>
  )
}

export default ShareMenu
