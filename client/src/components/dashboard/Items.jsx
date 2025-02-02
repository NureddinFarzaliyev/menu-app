import React from 'react'
import EditItem from './EditItem'
import DeleteItem from './DeleteItem'

const Items = ({items, onEdit, categoryId}) => {

  return (
    <div>
      {items?.map((item) => (
        <div key={item._id}> 
          {item.name} {item.price} {item.description} 
          {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{width: '100px'}} />}
          <EditItem onEdit={onEdit} categoryId={categoryId} itemId={item._id} /> 
          <DeleteItem onDelete={onEdit} categoryId={categoryId} itemId={item._id} />
        </div>
      ))}
    </div>
  )
}

export default Items
