import React from 'react'
import EditCategory from './EditCategory'
import DeleteCategory from './DeleteCategory'
import Items from './Items'

const Categories = ({menu, onEdit}) => {
  return (
    <ul>
      {menu.categories && menu.categories.map((category) => (
        <div key={category._id}>
          <li>{category.name}</li>
          <EditCategory onEdit={onEdit} category={category}/>
          <DeleteCategory onDelete={onEdit} categoryId={category._id}/>
          <Items items={category.items} onEdit={onEdit} categoryId={category._id} />
        </div>
      ))}
    </ul>
  )
}

export default Categories
