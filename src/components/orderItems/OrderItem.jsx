export const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center space-x-4 p-2 border-b last:border-b-0">
      <img
        src={item.image}
        alt={item.product_title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.product_name}</h3>
        <p className="text-gray-600">{item.product_title}</p>
        <p className="text-gray-500">Quantity: {item.order_quantity}</p>
      </div>
      <div className="font-bold">
        ${item.product_price * item.order_quantity}
      </div>
    </div>
  );
}