import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginuser } from "../../api/users"
import { ShoppingContext } from "../store/EcommerceContext"

const isEmpty = (value) => value.trim() === ""
const isMoreThanSix = (value) => value.trim().length >= 6
const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value.trim())

export const LoginUser = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("");

  const [formValidity, setFormValidity] = useState({
    email: true,
    password: true
  })

  const [enteredEmail, setEnteredEmail] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("")

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const { setEmail } = useContext(ShoppingContext);

  const inputFormIsValid = () => {
    const enteredEmailIsValid = !isEmpty(enteredEmail) && isValidEmail(enteredEmail)
    const enteredPasswordIsValid = isMoreThanSix(enteredPassword)

    setFormValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid
    })
    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid

    return formIsValid
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEnteredEmail(value)
    setFormValidity((prev) => ({
      ...prev,
      email: !isEmpty(value) && isValidEmail(value)
    }))
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setEnteredPassword(value)
    setFormValidity((prev) => ({
      ...prev,
      password: isMoreThanSix(value)
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!inputFormIsValid()) {
      return
    }
    try {
      const response = await loginuser({ email: enteredEmail, password: enteredPassword })
      console.log("login respone: ", response.data)

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("email", JSON.stringify(enteredEmail))
        setEmail(enteredEmail);
        navigate("/products");
      }

    } catch (error) {
      console.error(error)

      if (error.response && error.response.data.error === "invalid email or password") {
        setError("invalid email or password")
      }
    }

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-[whitesmoke] rounded-lg shadow-lg border border-gray-300">
      <header className="font-bold text-center text-xl p-2" >Login here</ header>
      <form onSubmit={submitHandler} className="flex flex-col">
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <div className="flex flex-col  gap-2 p-1 " >
          <label>Email</label>
          <input
            placeholder="Enter Your email"
            name="email" ref={emailInputRef}
            value={enteredEmail} onChange={handleEmailChange}
            type="email" className={`border border-gray-300 text-sm focus:outline-none  p-2 rounded ${error === "invalid email or password" ? "border-red-500" : "border-gray-300"} ${!formValidity.email ? "border-red-500" : ""}`} />
          {!formValidity.email && <div className="text-red-500 text-sm">Please Enter a valid email address!</div>}
        </ div>
        <div className="flex flex-col justify-center gap-2 p-1">
          <label>Password</label>
          <input placeholder="Enter Your Password"
            ref={passwordInputRef}
            name="password"
            value={enteredPassword} onChange={handlePasswordChange}
            type="password" className={`border border-gray-300 text-sm focus:outline-none  p-2 rounded ${error === "invalid email or password" ? "border-red-500" : "border-gray-300"}  ${!formValidity.password ? "border-red-500" : ""}`} />
          {!formValidity.password && <div className="text-red-500 text-sm">Please Enter a valid password</div>}
        </div>
        <button type="submit" className="bg-black text-white py-2 mt-4 cursor-pointer rounded hover:opacity-75">Submit</button>
        <div className="flex justify-center gap-2 items-center font-thin text-sm mt-6">
          <div className="">New user?</div>
          <Link to="/signup">
            <div className="shadow-md px-2 py-1 hover:underline hover:opacity-75 rounded-sm">signup</div>
          </Link>

        </div>
      </form >
    </div >
  )
}