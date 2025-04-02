import { createContext, useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { deleteUserByEmail, getUserByEmail } from "../../api/users";

export const ShoppingContext = createContext({
  user: null,
  products: [],
  addItemToCart: () => { },
  updateItemQuantity: () => { },
  removeItem: () => { },
  fetchProducts: () => { },
  email: "",
  items: []
})

export const ShoppingContextProvider = ({ children }) => {

  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
    Password: "",
    role: "",
  })

  const [products, setProducts] = useState([
    {
      productId: "",
      name: "",
      title: "",
      price: "",
      image: ""
    }

  ])

  const [email, setEmail] = useState("")


  const [shoppingCart, setShoppingCart] = useState({
    items: []
  })


  // getting user details from database
  const fetchUserByEmail = async (email) => {
    if (!email) {
      console.error("no email provided")
      return
    }

    try {
      const response = await getUserByEmail(email)
      // console.log("user-by-email", response.data)
      setUser(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // getting products from db
  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      // console.log("products-reponse", response.data)
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRequredData = () => {
    if (email) {
      fetchUserByEmail(email)
      // fetchCartItemsByEmail(email)
      fetchProducts()
    }

  }

  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem("email"))
    setEmail(storedEmail)
  }, [])


  useEffect(() => {
    if (user.email) {
      const savedCart = localStorage.getItem(`cartitems${user.email}`);
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const filteredCartItems = cartItems.filter((item) => item.email === user.email);
        setShoppingCart({
          items: filteredCartItems
        });
      }
    }
  }, [user.email]);

  useEffect(fetchRequredData, [email])

  // removing user from db
  const deleteUser = async () => {
    try {
      const response = await deleteUserByEmail(email)
      console.log("delete-user-response", response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // adding item to the cart
  const handleAddItemToCart = (id) => {
    setShoppingCart((prevShoppingCart) => {
      const updateitems = [...prevShoppingCart.items]
      const existingCartItemIndex = updateitems.findIndex((cartItem) => cartItem.id === id)
      const existingCartItem = updateitems[existingCartItemIndex]

      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        }
        updateitems[existingCartItemIndex] = updateItem
      } else {
        const product = products.find((product) => product.productId === id)
        updateitems.push({
          id: id,
          userId: user.userId,
          email: user.email,
          image: product.image,
          productId: product.productId,
          productName: product.name,
          productTitle: product.title,
          productPrice: product.price,
          quantity: 1
        })
      }
      saveCartToLocalStorage(updateitems)
      return {
        items: updateitems
      }
    })
  }

  // handle cart item quantity
  const handleUpdateItemQuantity = (productId, amount) => {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items]
      const updateItemIndex = updatedItems.findIndex((item) => item.id === productId)
      if (updateItemIndex !== -1) {
        const updateItem = {
          ...updatedItems[updateItemIndex]
        }

        updateItem.quantity += amount

        if (updateItem.quantity <= 0) {
          updatedItems.splice(updateItemIndex, 1)
        } else {
          updatedItems[updateItemIndex] = updateItem
        }
      }
      saveCartToLocalStorage(updatedItems)

      return {
        items: updatedItems
      }
    })
  }

  // removing item from cart
  const handleRemove = (id) => {
    setShoppingCart((prevShoppingCart) => {
      const updateItems = prevShoppingCart.items.filter((item) => item.id != id)
      saveCartToLocalStorage(updateItems)
      return {
        items: updateItems
      }
    })

  }
  // storing cart items in the local storage
  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem(`cartitems${email}`, JSON.stringify(cartItems))
  }


  const ctxValue = {
    items: shoppingCart.items,
    user: user,
    products: products,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateItemQuantity,
    removeItem: handleRemove,
    fetchProducts: fetchProducts,
    email: email,
    setShoppingCart: setShoppingCart,
    setEmail: setEmail,
    setUser: setUser,
    deleteUser: deleteUser
  }

  return (
    <ShoppingContext.Provider value={ctxValue}>
      {children}
    </ShoppingContext.Provider>
  )
}
