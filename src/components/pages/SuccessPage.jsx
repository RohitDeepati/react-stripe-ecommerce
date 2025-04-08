import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { createOrder } from "../../api/orderAPI"
import { GetCheckoutSessionDeatils } from "../../api/stripePayment"
import { backIcon, CheckFillIcon } from "../../assets/icons"
import { ShoppingContext } from "../store/EcommerceContext"

export const SuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null)
  const { email, setShoppingCart } = useContext(ShoppingContext)
  const items = JSON.parse(localStorage.getItem(`cartitems${email}`)) || []
  const location = useLocation()
  const navigate = useNavigate();
  console.log("payment-status", paymentStatus)

  const getPaymentstatusSession = async () => {
    const sessionId = new URLSearchParams(location.search).get("session_id")
    if (!sessionId) return;

    try {
      const response = await GetCheckoutSessionDeatils(sessionId)
      // console.log("payment-response", response?.data?.paymentStatus)
      setPaymentStatus(response?.data?.paymentStatus)
    } catch (error) {
      console.error(error)
    }
  }

  const createNewOrder = async () => {
    try {
      const response = await createOrder(data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  // const data = {
  //   userid: items.userId,
  //   productid: items.productId,
  //   quantity: items.quantity
  // }

  const data = items?.map((item) => ({
    userid: item.userId,
    productid: item.productId,
    quantity: item.quantity
  }))

  useEffect(() => { getPaymentstatusSession() }, [location])
  useEffect(() => {
    if (paymentStatus) {
      if (paymentStatus !== 'paid') {
        setTimeout(() => {
          navigate('/cart')
        }, 3000)
      }
      else if (paymentStatus === 'paid') {
        createNewOrder(data)
        setShoppingCart({
          items: []
        })
        localStorage.removeItem(`cartitems${email}`)
      }
    }
  }, [paymentStatus])

  if (!paymentStatus) return <div>Checking payment status, please wait...</div>

  return (
    <div className="flex items-center justify-center min-h-screen">
      {paymentStatus === "paid" ?
        <div className="text-center p-5">
          <div className="text-green-500 flex justify-center p-2">{CheckFillIcon}</div>
          <div>Your payment is successful</div>
          <Link to="/products">
            <div className="flex items-center gap-2 p-2 bg-black text-white m-2 rounded-md hover:opacity-85">
              <span>{backIcon}</span>Back to Shopping
            </div>
          </Link>
        </div> :
        <div>
          <div>your payment is failed</div>
        </div>}

    </div>

  )
}