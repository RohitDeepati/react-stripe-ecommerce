export const ProductForm = ({ handleSubmit, errors, handleInputChange, productData }) => {
  return (
    <form className="p-4 flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="productName" className="font-medium">Product Name</label>
        <input
          autoComplete={"off"}
          className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black"
          id="productName"
          name="productName"
          value={productData.productName}
          onChange={handleInputChange}
          placeholder="Enter Product Name"
        />
        {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="productTitle" className="font-medium">Product Title</label>
        <input
          autoComplete={"off"}
          className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black"
          id="productTitle"
          name="productTitle"
          value={productData.productTitle}
          onChange={handleInputChange}
          placeholder="Enter Product Title"
        />
        {errors.productTitle && <p className="text-red-500 text-sm">{errors.productTitle}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="price" className="font-medium">Price</label>
        <input
          autoComplete={"off"}
          className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Enter Price" />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="stock" className="font-medium">Stock</label>
        <input
          autoComplete={"off"}
          className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black"
          id="stock"
          name="stock"
          value={productData.stock}
          onChange={handleInputChange}
          placeholder="Enter Stock"
        />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="image" className="font-medium">Image</label>
        <input
          className="outline-none border border-gray-300 px-2 py-2 rounded shadow-xs text-sm focus:border-black"
          id="image"
          name="image"
          value={productData.image}
          onChange={handleInputChange}
          placeholder="Enter image url"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-black text-white py-1 rounded cursor-pointer hover:opacity-85"
        >
          Add Product
        </button>
      </div>
    </form>
  )
}