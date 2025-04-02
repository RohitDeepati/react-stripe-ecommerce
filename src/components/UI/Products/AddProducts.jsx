import { useCallback, useContext, useEffect, useState } from "react"
import { SellerNavbar } from "../../utils/SellerNavbar"
import { getProducts } from "../../../api/products"
import { ShoppingContext } from "../../store/EcommerceContext"

export const AddNewproducts = () => {
  const { user } = useContext(ShoppingContext)
  const [products, setProducts] = useState([])

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getProducts()
      const filteredData = response.data.filter((item) => item.sellerId === user.userId)
      console.log("filterdData", filteredData)
      setProducts(filteredData)
    } catch (error) {
      console.error(error)
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
      {products && products.length === 0 ? (<div>No products Added</div>) : (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Product Catalog</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 text-sm">
                    <th className="px-4 py-3 text-left font-medium">Product ID</th>
                    <th className="px-4 py-3 text-left font-medium">Image</th>
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Title</th>
                    <th className="px-4 py-3 text-right font-medium">Price</th>
                    <th className="px-4 py-3 text-center font-medium">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product.productId}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {product.title}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 text-right">
                        ${product.price ? product.price.toFixed(2) : "0.00"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${product.stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }
                    `}>
                          {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}