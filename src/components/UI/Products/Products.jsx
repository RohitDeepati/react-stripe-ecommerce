import { useContext } from "react"

import { ShoppingContext } from "../../store/EcommerceContext"
import { Product } from "./Product"
import { AddNewproducts } from "./AddProducts"

export const Products = () => {

  const { user } = useContext(ShoppingContext)

  return (
    <>
      <div>

        {user && user?.role === "Buyer" || user?.role === "buyer" ? (
          <Product />
        ) : (
          <AddNewproducts />
        )}


      </div>
    </>
  )
}