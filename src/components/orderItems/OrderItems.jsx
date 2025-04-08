import { useContext, useEffect, useState } from "react"
import { Link } from "react-router"
import { getOrdersByUserEmail } from "../../api/orderAPI"
import { ShoppingContext } from "../store/EcommerceContext"
import { OrderCard } from "./OrderCard"

export const OrderItems = () => {
  const { email } = useContext(ShoppingContext)
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(true)



  const getOrders = async () => {
    try {
      const response = await getOrdersByUserEmail(email)
      const orderData = response.data

      const orderMap = orderData.reduce((groups, item) => {
        if (!groups[item.order_id]) {
          groups[item.order_id] = []
        }
        groups[item.order_id].push(item)
        return groups
      }, {})

      const groupOrderItemsArray = Object.values(orderMap)
      setOrderItems(groupOrderItemsArray)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  console.log("groupby-order-items", orderItems)
  useEffect(() => {
    if (email) {
      getOrders(email)
    }
  }, [email])

  if (loading) {
    return (
      <div className="text-center text-black mt-8 text-gray-600 font-medium">
        orders Loading...
      </div>
    )
  }
  return (
    <>
      <nav className="flex justify-between sticky top-0 left-0 right-0 p-4 bg-white border-b border-gray-300">
        <Link to="/products">
          <div className="bg-black text-white rounded-sm hover:opacity-85">
            <h1 className="px-2 py-1">SHOES-ZONE</h1>
          </div>
        </Link>
      </nav>
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Order History
        </h1>
        {orderItems.length === 0 ? (
          <div>No orders found</div>
        ) : (orderItems.map((orderItem) => (
          <OrderCard key={orderItem[0].order_id} orderItems={orderItem} />
        ))
        )}
      </div>
    </>
  )

}