import { useContext } from "react"
import { RemoveIcon } from "../../assets/icons"
import { ShoppingContext } from "../store/EcommerceContext"

export const CartItem = () => {
  const { items, updateItemQuantity, removeItem } = useContext(ShoppingContext)
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="flex justify-evenly items-center p-2 border-b border-gray-300">
          <div>
            <img src={item.image} className="h-24" />
          </div>
          <div>
            <h2 className="text-bold text-gray-400">{item.productName}</h2>
            <h3>{item.productTitle}</h3>
          </div>
          <div>
            <div className="flex flex-evenly gap-2 font-bold items-center">
              <button className="cursor-pointer" onClick={() => updateItemQuantity(item.id, -1)}>-</button>
              <span className="border border-gray-300 px-1.5">{item.quantity}</span>
              <button className="cursor-pointer" onClick={() => updateItemQuantity(item.id, 1)}>+</button>
            </div>
          </div>
          <div>
            <h4 className="font-medium flex items-center gap-1"> $ {item.productPrice} <span className="text-xs text-gray-500">x {item.quantity}</span></h4>
          </div>
          <div>
            <button onClick={() => removeItem(item.id)} className="font-bold text-md text-gray-500 cursor-pointer hover:text-red-500">{RemoveIcon}</button>
          </div>
        </div>
      ))}
    </div>

  )
}