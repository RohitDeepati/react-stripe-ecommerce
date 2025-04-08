import { ProductDeleteButton } from "../ProductButtons/ProductDeleteButton"
import { ProductEditButton } from "../ProductButtons/ProductEditButton"

export const ProductsTableBody = ({ products, fetchProducts, setProducts, handleEditProduct }) => {
  return (
    <>
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
          <td
            className="px-4 py-3 text-sm text-gray-700"
          >
            {product.name}
          </td>
          <td
            className="px-4 py-3 text-sm text-gray-700"
          >
            {product.title}
          </td>
          <td
            className="px-4 py-3 text-sm text-gray-700 text-right">
            ${product.price ? product.price.toFixed(2) : "0.00"}
          </td>
          <td className="px-4 py-3 text-center">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium
                            ${product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                }
                          `}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </span>
          </td>
          <td className="hover:text-green-600 ">
            <ProductEditButton
              product={product}
              onEditProduct={handleEditProduct}
              fetchProducts={fetchProducts}
            />
          </td>
          <td className="">
            <ProductDeleteButton
              product={product}
              setProducts={setProducts} />
          </td>
        </tr>
      ))}
    </>
  )
}