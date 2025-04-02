import { useContext } from "react"
import { Link, useNavigate } from "react-router"
import { avatarIcon, closeicon, packageIcon } from "../../assets/icons"
import { ShoppingContext } from "../store/EcommerceContext"

export const Modal = ({ closeModel }) => {
  const { user, setEmail, setUser } = useContext(ShoppingContext)
  const navigate = useNavigate()

  const handleLogoutBtn = () => {
    setEmail("")
    setUser({})
    localStorage.removeItem("email")
    navigate("/")
  }
  return (
    <div className="flex justify-end w-1/4 mx-auto shadow-md  fixed bg-[#00000099] top-[64px] h-full w-full top-0">
      <div className=" bg-white p-2 px-4">
        <div className="flex justify-end">
          <button className="hover:text-red-500 cursor-pointer" onClick={closeModel}>{closeicon}</button>
        </div>
        <div className="flex flex-col text-center">
          <div className="flex justify-center">{avatarIcon} </div>
          <h2>{user.name}</h2>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/orders">
            <button className="cursor-pointer border-[white] bg-white mx-auto px-2 rounded-md cursor-pointer hover:bg-black hover:text-white flex items-center gap-1">Orders <span>{packageIcon}</span></button>
          </Link>
          <button className="cursor-pointer border-[white] bg-white mx-auto px-2 rounded-md cursor-pointer hover:bg-black hover:text-white" onClick={handleLogoutBtn}>Logout</button>
          <button className="cursor-pointer border-[white] bg-white mx-auto px-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white">Delete Account</button>
        </div>
      </div>
    </div>
  )
}