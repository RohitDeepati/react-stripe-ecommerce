import { useState } from "react"
import { ProductsTableHead } from "./ProductsTableHead"
import { ProductsTableBody } from "./ProductsTableBody"


export const ProductsTable = ({ products, fetchProducts, setProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
  }
  return (
    <table className="w-full">
      <thead>
        <ProductsTableHead />
      </thead>
      <tbody>
        <ProductsTableBody
          products={products}
          fetchProducts={fetchProducts}
          setProducts={setProducts}
          handleEditProduct={handleEditProduct}
        />
      </tbody>
    </table>
  )
}