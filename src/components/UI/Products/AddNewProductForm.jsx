import { useContext, useState } from "react"
import { ShoppingContext } from "../../store/EcommerceContext"
import { addNewProduct } from "../../../api/products"

export const AddNewProductForm = ({ onSuccess }) => {
  const { user } = useContext(ShoppingContext)
  const [productData, setProductData] = useState({
    productName: "",
    productTitle: "",
    price: "",
    stock: "",
    image: ""
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

    if (!productData.productName.trim()) {
      newErrors.productName = "Product Name is required"
    }

    if (!productData.productTitle.trim()) {
      newErrors.productTitle = "Product Title is required"
    }

    if (!productData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(productData.price)) || Number(productData.price) < 0) {
      newErrors.price = "Price must be a valid Positive number"
    }

    if (!productData.stock.trim()) {
      newErrors.quantity = "Quantity is required"
    } else if (isNaN(Number(productData.stock)) || Number(productData.quantity) < 0) {
      newErrors.quantity = "Quantity must be a valid Positive number"
    }
    if (!productData.image.trim()) {
      newErrors.image = "image url is required"
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
      await addNewProduct(productDataToSubmit)
      setProductData({ productName: "", productTitle: "", price: "", stock: "", image: "" })
      onSuccess()
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-[whitesmoke] m-4 rounded-lg shadow-lg border border-gray-300">

        <form className="p-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="productName" className="font-medium">Product Name</label>
            <input className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black" id="productName" name="productName" value={productData.productName} onChange={handleInputChange} placeholder="Enter Product Name" />
            {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="productTitle" className="font-medium">Product Title</label>
            <input className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black" id="productTitle" name="productTitle" value={productData.productTitle} onChange={handleInputChange} placeholder="Enter Product Title" />
            {errors.productTitle && <p className="text-red-500 text-sm">{errors.productTitle}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="font-medium">Price</label>
            <input className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black" id="price" name="price" value={productData.price} onChange={handleInputChange} placeholder="Enter Price" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="stock" className="font-medium">Stock</label>
            <input className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black" id="stock" name="stock" value={productData.stock} onChange={handleInputChange} placeholder="Enter Stock" />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="font-medium">Image</label>
            <input className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black" id="image" name="image" value={productData.image} onChange={handleInputChange} placeholder="Enter image url" />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>
          <div>
            <button type="submit" className="w-full bg-black text-white py-1 rounded cursor-pointer hover:opacity-85">Add Product</button>
          </div>
        </form>
      </div>
    </>
  )
}