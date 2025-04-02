import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { ShoppingContext } from "../../store/EcommerceContext";
import { cartIcon } from "../../../assets/icons";
import { Navbar } from "../../utils/Navbar";

export const Product = () => {
  const navigate = useNavigate();
  const { addItemToCart, products, items, fetchProducts } = useContext(ShoppingContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const isProductInCart = (productId) => items.some((item) => item.productId === productId);

  const handleAddToCartBtnClicked = (id) => {
    if (isProductInCart(id)) {
      navigate("/cart");
    } else {
      addItemToCart(id);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-5 gap-4 p-4">
        {products.map((product) => (
          <div key={product.productId} className="relative border border-[whitesmoke] w-64 rounded-sm hover:shadow-lg cursor-pointer">
            {/* Product Image with Blur Effect for Out of Stock */}
            <div className="relative">
              <img
                className={`h-80 w-full object-cover ${product.stock <= 0 ? "blur-sm opacity-50" : ""}`}
                src={product.image}
                alt={product.name}
              />
              {/* Out of Stock Overlay */}
              {product.stock <= 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
                  <span className="bg-transparent px-3 py-1 rounded border border-white backdrop-blur-sm text-red-500">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h2 className="font-bold px-2">{product.name}</h2>
              <h3 className="text-xs font-light px-2">{product.title}</h3>
              <h4 className="font-semibold text-lg px-2">${product.price}</h4>
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-center mb-2">
              <button
                className={`flex gap-2 cursor-pointer px-2 py-1 shadow-md justify-center items-center text-white ${product.stock <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : isProductInCart(product.productId)
                    ? "bg-gray-700 hover:opacity-75"
                    : "bg-black hover:opacity-85"
                  }`}
                onClick={() => handleAddToCartBtnClicked(product.productId)}
                disabled={product.stock <= 0}
              >
                {product.stock <= 0
                  ? "Out of Stock"
                  : isProductInCart(product.productId)
                    ? "Go To Cart"
                    : "Add To Cart"}
                {product.stock > 0 && <span>{cartIcon}</span>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
