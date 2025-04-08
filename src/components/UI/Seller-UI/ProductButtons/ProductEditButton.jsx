import { Button, Modal } from "antd"
import { useState } from "react"
import { EditIcon } from "../../../../assets/icons"
import { AddNewProductForm } from "../ProductForms/AddNewProductForm"

export const ProductEditButton = ({ product, onEditProduct, fetchProducts }) => {
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false)

  const handleEditProductCancel = () => {
    setIsEditProductModalOpen(false)
  }

  const showEditProductModal = () => {
    onEditProduct(product)
    setIsEditProductModalOpen(true)
  }

  return (
    <>
      <Button
        style={{ color: "green", border: "green" }}
        onClick={showEditProductModal}
        className="cursor-pointer" >
        {EditIcon}
      </Button>
      <Modal
        title="Edit Product"
        open={isEditProductModalOpen}
        footer={false}
        onCancel={handleEditProductCancel}
      >
        <AddNewProductForm
          product={product}
          onSuccess={fetchProducts}
          setIsEditProductModalOpen={setIsEditProductModalOpen}
        />
      </Modal>
    </>
  )
}