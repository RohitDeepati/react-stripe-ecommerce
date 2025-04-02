import { useEffect } from "react"
import { paymentIntentApi } from "../../api/stripePayment"

export const PaymentForm = () => {

  const dataTosumbit = ({
    amount: 200,
    currency: "usd"
  })


  const postPaymentIntent = async () => {
    try {
      const response = await paymentIntentApi(dataTosumbit)
      console.log("payment-intent-response", response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    postPaymentIntent()
  }, [])

  return (
    <div>paymentform</div>
  )
}