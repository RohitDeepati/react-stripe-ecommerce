import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { avatarIcon, cartIcon, deleteIcon, packageIcon, logoutIcon } from "../../assets/icons"
import { ShoppingContext } from "../store/EcommerceContext"
import { Badge } from "antd"

import { Popover, Button, Modal } from "antd";
// import { deleteUserByEmail } from "../../api/users";

export const Navbar = () => {
  const { user, items, setEmail, setUser, email, deleteUser } = useContext(ShoppingContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [confirmationLoading, setConfirmationLoading] = useState(false)

  // const totalQuantity = items?.reduce((acc, item) => acc + item.quantity, 0)

  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    if (email) {
      deleteUser(email)
      navigate("/")
    }

    setConfirmationLoading(false)
  }

  const handleOrderBtn = () => {
    navigate("/orders")
  }

  const handleCancle = () => {
    setOpen(false)
  }

  const handleLogoutBtn = () => {
    setEmail("")
    setUser({})
    localStorage.removeItem("email")
    navigate("/")
  }

  const content = (
    <div className="flex justify-center flex-col gap-1">
      <div className="text-center">{user.name}</div>
      <button className="flex items-center gap-1 justify-center hover:bg-black hover:text-white cursor-pointer rounded border border-gray-300 " onClick={handleOrderBtn}>Orders <span>{packageIcon}</span></button>
      <button className="flex items-center gap-1 justify-center border border-gray-300 rounded cursor-pointer rounded hover:bg-amber-400 hover:text-white" onClick={handleLogoutBtn}>Logout<span>{logoutIcon}</span></button>
      <Button className="flex items-center gap-1 justify-center border border-gray-300 rounded cursor-pointer hover:bg-red-500 hover:text-white text-sm px-2" onClick={showModal}>Delete Account <span>{deleteIcon}</span></Button>
      <Modal
        title="Are you sure want to delete your account"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmationLoading}
        onCancel={handleCancle}
      >
      </Modal>
    </div>
  )

  return (

    <nav className="flex justify-between sticky z-50 shadow-50 top-0 left-0 right-0 p-4 bg-white border-b border-gray-300">
      <Link to="/products">
        <div className="border border-gray-400 rounded">
          <h1 className="px-2 hover:opacity-85 bg-gray-100">SHOESZONE</h1>
        </div>
      </Link>

      <div className="flex  gap-4 justify-center  items-center">
        <Link to="/cart">
          <div className="flex flex-row items-center gap-1 border border-gray-400 px-2 rounded" >
            <div >Cart</div>
            <Badge count={items?.length}>
              <h3 className="flex gap-1 items-center font-light cursor-pointer hover:opacity-75">{cartIcon}</h3>
            </Badge>
          </div>
        </Link>
        <div className="text-xs  flex  flex-col">
          <Popover content={content} >
            <button type="primary" className="cursor-pointer"> {avatarIcon}</button>
          </Popover>
        </div>
      </div>


    </nav>
  )
}