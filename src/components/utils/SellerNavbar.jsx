import { useContext, useState } from "react"
import { ShoppingContext } from "../store/EcommerceContext"
import { Link, useNavigate } from "react-router"
import { avatarIcon, deleteIcon, logoutIcon } from "../../assets/icons"
import { Button, Modal, Popover } from "antd"
import { AddNewProductForm } from "../UI/Products/AddNewProductForm"

export const SellerNavbar = ({ fetchProducts }) => {
  const { user, setEmail, setUser, deleteUser, email } = useContext(ShoppingContext)
  const navigate = useNavigate()
  const [confirmationLoading, setConfirmationLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [isAddnewProductModalOpen, setIsAddNewProductModalOpen] = useState(false)


  const showDeleteBtnModal = () => {
    setOpen(true)
  }

  const showAddNewProductModal = () => {
    setIsAddNewProductModalOpen(true)
  }

  const handleAddNewProductCancel = () => {
    setIsAddNewProductModalOpen(false)
  }

  const handleLogoutBtn = () => {
    setEmail("")
    setUser({})
    localStorage.removeItem("email")
    navigate("/")
  }

  const handleDeleteBtnOk = () => {
    if (email) {
      deleteUser(email)
      navigate("/")
    }

    setConfirmationLoading(false)
  }
  const handleDeleteBtnModalCancle = () => {
    setOpen(false)
  }

  const content = (
    <div className="flex justify-center flex-col gap-1">
      <button className="flex items-center gap-1 justify-center border border-gray-300 px-2 rounded cursor-pointer rounded hover:bg-amber-400 hover:text-white" onClick={handleLogoutBtn}>Logout<span>{logoutIcon}</span></button>
      <Button className="flex items-center gap-1 justify-center border border-gray-300 rounded cursor-pointer hover:bg-red-500 hover:text-white text-sm px-2" onClick={showDeleteBtnModal}>Delete Account <span>{deleteIcon}</span></Button>
      <Modal
        title="Are you sure want to delete your account"
        open={open}
        onOk={handleDeleteBtnOk}
        confirmLoading={confirmationLoading}
        onCancel={handleDeleteBtnModalCancle}
      >
      </Modal>
    </div>
  )

  return (
    <nav className="flex justify-between sticky top-0 left-0 right-0 p-4 bg-white border-b border-gray-300">
      <Link to="/products">
        <div>
          <h1 className="flex items-center gap-1">SHOES-ZONE<span className="text-[9px] border border-gray-300 px-2 text-orange-400 rounded">Seller</span></h1>
        </div>
      </Link>

      <div className="flex gap-4  items-center">
        <Button type="primary" onClick={showAddNewProductModal} >Add New Product</Button>
        <Modal title="Add New Product" open={isAddnewProductModalOpen} footer={false} onCancel={handleAddNewProductCancel} >
          <AddNewProductForm onSuccess={fetchProducts} />
        </Modal>
        <Popover content={content}>
          <div className="flex flex-col items-center cursor-pointer">{avatarIcon} <span className="text-sm font-thin">{user?.name}</span></div>
        </Popover>
        <div className="text-xs  flex items-center flex-col">
        </div>
      </div>

    </nav >)
}