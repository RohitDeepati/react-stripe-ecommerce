import { useCallback, useContext, useEffect, useState } from "react"
import { getProducts } from "../../../api/products"
import { ShoppingContext } from "../../store/EcommerceContext"
import { SellerNavbar } from "../../utils/SellerNavbar"
import { ProductsTable } from "../Seller-UI/ProductsTable/ProductsTable"



export const AddedProducts = () => {
  const { user } = useContext(ShoppingContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getProducts()
      const filteredData = response.data.filter((item) => item.sellerId === user.userId)
      setProducts(filteredData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user?.userId) {
      fetchProducts()
    }
  }, [user, fetchProducts])



  return (
    <div>
      <SellerNavbar fetchProducts={fetchProducts} />
      {loading ? (
        <div className="text-center mt-8 text-gray-600 font-medium">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center mt-8 text-gray-600 font-medium">No products added</div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Product Catalog</h2>
            </div>
            <div className="overflow-x-auto">
              <ProductsTable
                products={products}
                fetchProducts={fetchProducts}
                setProducts={setProducts}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
