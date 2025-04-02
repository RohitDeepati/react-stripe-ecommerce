import { OrderItem } from "./OrderItem";

export const OrderCard = ({ orderItems }) => {

  const totalOrderValue = orderItems.reduce((total, item) => total + (item.product_price * item.order_quantity), 0)
  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div className="bg-gray-100 p-4 flex justify-end items-center">
        <span className="font-semibold text-green-600">
          Total: ${totalOrderValue.toFixed(2)}
        </span>
      </div>
      <div>
        {orderItems.map(item => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}