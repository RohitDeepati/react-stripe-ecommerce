import { useContext, useEffect, useState } from "react"
import { ShoppingContext } from "../../store/EcommerceContext"
import { Product } from "./Product"
import { AddedProducts } from "../Seller-UI/AddedProducts"

export const Products = () => {
  const [loading, setLoading] = useState(true)
  const { user } = useContext(ShoppingContext)

  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return (
      <div className="text-center mt-8 text-gray-600 font-medium">
        Loading...
      </div>
    )
  }

  return (
    <>
      <div>
        {user && user?.role === "Buyer" || user?.role === "buyer" ? (
          <Product />
        ) : (
          <AddedProducts />
        )}
      </div>
    </>
  )
}