import { useContext } from "react"
import { RemoveIcon } from "../../assets/icons"
import { ShoppingContext } from "../store/EcommerceContext"

export const CartItem = () => {
  const { items, updateItemQuantity, removeItem } = useContext(ShoppingContext)
  console.log("items", items)
  return (
    <div>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-50"
        >
          {/* Product Image - Fixed width */}
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={item.image}
              className="h-full w-full object-contain"
              alt={item.productName}
            />
          </div>

          {/* Product Info - Fixed width */}
          <div className="w-52 px-4">
            <h2 className="font-medium text-gray-400 truncate">{item.productName}</h2>
            <h3 className="text-sm truncate">{item.productTitle}</h3>
          </div>

          {/* Quantity Controls - Fixed width */}
          <div className="w-32 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded cursor-pointer hover:opacity-85 hover:bg-gray-100"
                onClick={() => updateItemQuantity(item.id, -1)}
              >
                -
              </button>
              <span className="w-10 text-center border border-gray-300 py-1">
                {item.quantity}
              </span>
              <button
                className="w-8 h-8 flex items-center justify-center border border-gray-300 cursor-pointer hover:opacity-85 rounded hover:bg-gray-100"
                onClick={() => updateItemQuantity(item.id, 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="w-28 text-center">
            <h4 className="font-medium flex items-center justify-center gap-1">
              ${item.productPrice}
              <span className="text-xs text-gray-500">x {item.quantity}</span>
            </h4>
            <div className="text-sm font-medium text-gray-700 mt-1">
              ${(item.productPrice * item.quantity).toFixed(2)}
            </div>
          </div>
          <div className="w-16 flex justify-center">
            <button
              onClick={() => removeItem(item.id)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full"
              aria-label="Remove item"
            >
              {RemoveIcon}
            </button>
          </div>
        </div>
      ))}
    </div>


  )
}