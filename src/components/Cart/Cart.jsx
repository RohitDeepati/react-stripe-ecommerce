import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { backIcon } from "../../assets/icons.jsx"
import { PaymentForm } from "../payment/paymentForm.jsx"
import { ShoppingContext } from "../store/EcommerceContext.jsx"
import { CartItem } from "./cartItem.jsx"
import { OrderSummary } from "./OrderSummary.jsx"

export const Cart = () => {
  const { items } = useContext(ShoppingContext)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const total = items?.reduce((acc, item) => acc + item.productPrice * item.quantity, 0)
    setAmount(total)
  }, [items])

  const formattedTotalAmount = amount.toLocaleString('en-us', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const totalItems = items?.reduce((acc, item) => acc + item.quantity, 0)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading cart...</div>
      </div>
    )
  }

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
            ) : (
              <div className="flex flex-col items-center p-10 text-center text-gray-500">
                <p className="mb-4 text-lg">Your cart is empty.</p>
                <Link to="/products">
                  <button className="flex items-center px-3 text-[#414141] font-semibold text-sm cursor-pointer">
                    {backIcon}<span>Back to shop</span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          {items.length > 0 &&
            <OrderSummary totalItems={totalItems} formattedTotalAmount={formattedTotalAmount} amount={amount} />
          }
        </div>
      </div>
    </div>
  )
}
