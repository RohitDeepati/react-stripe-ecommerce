import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { avatarIcon, cartIcon, deleteIcon, packageIcon, logoutIcon } from "../../assets/icons"
import { ShoppingContext } from "../store/EcommerceContext"

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

  // const deleteUser = async () => {
  //   try {
  //     const response = await deleteUserByEmail(email)
  //     console.log("delete-user-response", response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

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
        <div>
          <h1>SHOESZONE</h1>
        </div>
      </Link>

      <div className="flex gap-4  items-center">
        <Link to="/cart">
          <h3 className="flex gap-2 items-center font-light cursor-pointer hover:opacity-75">Cart <span className="pt-1 flex items-center">{cartIcon}<span className="text-xs font-semi-bold">({items?.length})</span></span></h3>
        </Link>
        {/* <Link to="/"> */}
        <div className="text-xs  flex items-center flex-col">
          {/* <button className="cursor-pointer" onClick={openModal}>{avatarIcon} <span>{user.name}</span> </button> */}
          <Popover content={content} >
            <button type="primary" className="cursor-pointer"> {avatarIcon} <span>{user.name}</span></button>
          </Popover>
          {/* <p>{user.name}</p> */}
        </div>
        {/* </Link> */}
      </div>


    </nav>
  )
}