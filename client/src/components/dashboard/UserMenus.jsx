import { Link } from "react-router-dom"

const UserMenus = ({menus}) => {
  return (
    <div>
      {menus === null && <h1>Loading...</h1>}
      {menus?.length === 0 && <h1>No menus</h1>}
      {menus?.map((menu, index) => {
        return (
            <Link to={`/dashboard/menus/${menu._id}`} key={index}>
                <h1>{menu.name}</h1>
            </Link>
        )
      })}
    </div>
  )
}

export default UserMenus
