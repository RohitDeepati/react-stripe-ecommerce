import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"  // Make sure you're using the correct router library
import { backIcon, RemoveIcon } from "../../assets/icons.jsx"
import { PaymentForm } from "../payment/paymentForm.jsx"
import { ShoppingContext } from "../store/EcommerceContext.jsx"
import { CartItem } from "./cartItem.jsx"
import { OrderSummary } from "./OrderSummary.jsx"

export const Cart = () => {
  const { items, updateItemQuantity, removeItem } = useContext(ShoppingContext)
  const [amount, setAmount] = useState(0)

  console.log("---items-in-cart---", items)

  useEffect(() => {
    const total = items?.reduce((acc, item) => acc + item.productPrice * item.quantity, 0)
    setAmount(total)
  }, [items])

  const formattedTotalAmount = amount.toLocaleString('en-us', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const totalItems = items?.reduce((acc, item) => acc + item.quantity, 0)

  // Stripe Payment Link


  return (
    <div className="">
      <nav className="flex justify-between sticky top-0 left-0 right-0 p-4 bg-white border-b border-gray-300">
        <Link to="/products">
          <div>
            <h1>SHOESZONE</h1>
          </div>
        </Link>
      </nav>

      <div className="w-2/3 m-10 border border-gray-300 rounded-lg mx-auto shadow-md">
        <div className="flex justify-evenly">
          <div className="w-2/3">
            {items.length > 0 ? (
              <div>
                <div className="flex justify-between p-4 border-b border-gray-300">
                  <h1 className="font-bold text-2xl font-sans">Shopping Cart</h1>
                  <div className="text-sm font-bold text-[gray]"><span className="px-1">{totalItems}</span> items</div>
                </div>

                <CartItem />
                <div className="p-2">
                  <Link to="/products">
                    <button className="flex items-center px-3 text-[#414141] font-semibold text-sm cursor-pointer">{backIcon}<span>Back to shop</span></button>
                  </Link>
                </div>
              </div>
            ) :
              <div className="flex items-center">
                <div>
                  cart is empty
                </div>
                <Link to="/products">
                  <button className="flex items-center px-3 text-[#414141] font-semibold text-sm cursor-pointer">{backIcon}<span>Back to shop</span></button>
                </Link>
              </div>
            }
          </div>

          {items.length &&
            <OrderSummary totalItems={totalItems} formattedTotalAmount={formattedTotalAmount} amount={amount} />
          }
        </div>
      </div>
    </div>
  )
}
