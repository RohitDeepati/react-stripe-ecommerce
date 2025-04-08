import { useContext, useState } from "react"
import { addNewProduct, editProduct } from "../../../../api/products"

import { ShoppingContext } from "../../../store/EcommerceContext"
import { ProductForm } from "../ProductForms/ProductForm"


export const AddNewProductForm = ({ onSuccess, product, setIsEditProductModalOpen, setIsAddNewProductModalOpen }) => {
  const { user } = useContext(ShoppingContext)
  const [productData, setProductData] = useState({
    productName: product?.name || "",
    productTitle: product?.title || "",
    price: product?.price || "",
    stock: product?.stock || "",
    image: product?.image || ""
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const newErrors = {}


    if (!String(productData.productName).trim()) {
      newErrors.productName = "Product Name is required"
    }

    if (!String(productData.productTitle).trim()) {
      newErrors.productTitle = "Product Title is required"
    }

    if (!String(productData.price).trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(productData.price)) || Number(productData.price) < 0) {
      newErrors.price = "Price must be a valid Positive number"
    }

    if (!String(productData.stock).trim()) {
      newErrors.stock = "Stock is required"
    } else if (isNaN(Number(productData.stock)) || Number(productData.stock) < 0) {
      newErrors.stock = "Stock must be a valid Positive number"
    }

    if (!String(productData.image).trim()) {
      newErrors.image = "Image URL is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }



  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const productDataToSubmit = {
      sellerId: user.userId,
      name: productData.productName,
      title: productData.productTitle,
      price: Number(productData.price),
      stock: Number(productData.stock),
      image: productData.image
    }

    try {
      if (product) {
        await editProduct(product.productId, productDataToSubmit)
        setIsEditProductModalOpen(false)
      } else {
        await addNewProduct(productDataToSubmit)
        setIsAddNewProductModalOpen(false)
        setProductData({ productName: "", productTitle: "", price: "", stock: "", image: "" })
      }
      onSuccess()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-[whitesmoke] m-4 rounded-lg shadow-lg border border-gray-300">
        <ProductForm
          handleSubmit={handleSubmit}
          errors={errors}
          handleInputChange={handleInputChange}
          productData={productData}
        />
      </div>
    </>
  )
}