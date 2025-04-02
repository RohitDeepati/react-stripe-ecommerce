
import { CheckOutForm } from "./checkoutForm"

export const OrderSummary = ({ totalItems, formattedTotalAmount, amount }) => {


  return (
    <div className="bg-[#dddddd] w-1/3">
      <div className="pt-8 px-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold">Order Summary</h1>
      </div>
      <div className="flex justify-between p-2 border-b border-gray-300 text-[#414141]">
        <h3 className="font-semibold text-sm">ITEMS {totalItems}</h3>
        <h3>$ {formattedTotalAmount}</h3>
      </div>
      <div className="flex justify-between px-2 py-1">
        <div className="text-lg">Total Price: </div>
        <div className="font-semibold">$ {formattedTotalAmount}</div>
      </div>

      <div>
        <CheckOutForm />
      </div>
    </div>
  )
}