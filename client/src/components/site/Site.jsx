import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { sendGetRequest } from '../../utils/sendGetRequest'

const Site = () => {
    const {url} = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        sendGetRequest(`/site/${url}`, (res) => {setData(res)})
    }, [url])

    useEffect(() => {
        console.log(data)
    }, [data])

  return (
    <div>
      site with {url}
    </div>
  )
}

export default Site
