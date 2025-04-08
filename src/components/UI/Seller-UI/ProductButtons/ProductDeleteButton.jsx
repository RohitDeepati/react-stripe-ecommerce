import { Button } from "antd"
import { removeProduct } from "../../../../api/products"
import { deleteIcon } from "../../../../assets/icons"

export const ProductDeleteButton = ({ product, setProducts }) => {
  const deleteProduct = async (id) => {
    try {
      await removeProduct(id)
      setProducts((prevProducts) => prevProducts.filter((product) => product.productId !== id))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Button
        style={{ color: "red", border: "none", }}
        className="cursor-pointer hover:text-red-600 hover:bg-red-100"
        onClick={() => deleteProduct(product.productId)}>
        {deleteIcon}
      </Button>
    </>
  )
}