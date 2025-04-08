export const ProductsTableHead = () => {
  return (
    <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 text-sm">
      <th className="px-4 py-3 text-left font-medium">Product ID</th>
      <th className="px-4 py-3 text-left font-medium">Image</th>
      <th className="px-4 py-3 text-left font-medium">Name</th>
      <th className="px-4 py-3 text-left font-medium">Title</th>
      <th className="px-4 py-3 text-right font-medium">Price</th>
      <th className="px-4 py-3 text-center font-medium">Stock</th>
      <th></th>
      <th></th>
    </tr>
  )
}