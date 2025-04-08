import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { Cart } from "./components/Cart/Cart";
import { SignupUser } from "./components/auth/SignUp";
import { Products } from "./components/UI/Products/Products";
import { LoginUser } from "./components/auth/login";
import { ShoppingContextProvider } from "./components/store/EcommerceContext";
import StripeContainer from "./components/payment/StripeContainer";
import { SuccessPage } from "./components/pages/SuccessPage";
import { OrderItems } from "./components/orderItems/OrderItems";


function App() {
  return (
    <>
      <ShoppingContextProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupUser />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<LoginUser />} />
            <Route path="/checkout" element={<StripeContainer />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/orders" element={<OrderItems />} />
            {/* <Route path="/newproduct" element={<AddNewProductForm />} /> */}
          </Routes>
        </Router>
      </ShoppingContextProvider>
    </>
  )
}

export default App
