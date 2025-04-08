import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router"
import { addNewUser } from "../../api/users"
import { ShoppingContext } from "../store/EcommerceContext"


const isEmpty = (value) => value.trim() === ""
const isMoreThanSix = (value) => value.trim().length >= 6
const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value.trim())

export const SignupUser = () => {
  const navigate = useNavigate()
  const { setEmail } = useContext(ShoppingContext)

  const [error, setError] = useState("")

  const [formValidity, setFormValidity] = useState({
    name: true,
    email: true,
    password: true,
    role: true
  })

  const [enteredName, setEnteredName] = useState("")
  const [enteredEmail, setEnteredEmail] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("")
  const [enteredRole, setEnteredRole] = useState("")

  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const roleInputRef = useRef()



  const inputFormIsValid = () => {
    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredEmailIsValid = !isEmpty(enteredEmail) && isValidEmail(enteredEmail)
    const enteredPasswordIsValid = isMoreThanSix(enteredPassword)
    const enteredRoleIsValid = !isEmpty(enteredRole)

    setFormValidity({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
      role: enteredRoleIsValid
    })

    return enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid && enteredRoleIsValid
  }


  const submitHandler = async (e) => {
    e.preventDefault()
    if (!inputFormIsValid()) {
      return
    }

    const formData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      role: enteredRole
    }


    try {
      const response = await addNewUser(formData)
      console.log("response", response.data)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("email", JSON.stringify(formData.email))
        setEmail(formData.email)
        navigate("/products")
      }
    } catch (error) {
      console.error("Signup error", error)

      if (error.response && error.response.data.error) {
        setError(error.response.data.error)
      }
    }

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-[whitesmoke] rounded-lg shadow-lg border border-gray-300">
      <header className="font-semibold text-center text-xl p-2">New Account?</header>
      <form onSubmit={submitHandler} className="flex flex-col">
        {error && <div className="text-center text-red-500 text-sm">{error}</div>}
        <div className="flex flex-col gap-2 p-1">
          <label>Name</label>
          <input
            name="name"
            value={enteredName}
            ref={nameInputRef}
            onChange={(e) => setEnteredName(e.target.value)}
            type="text"
            placeholder="Enter your Name"
            className={`border border-gray-300 text-sm focus:outline-none  p-2 rounded ${!formValidity.name ? "border border-red-500" : ""}`}
          />
          {!formValidity.name && <p className="text-red-500 text-sm">Please enter a valid name</p>}

        </div>

        <div className="flex flex-col gap-2 p-1">
          <label>Email</label>
          <input
            name="email"
            value={enteredEmail}
            ref={emailInputRef}
            onChange={(e) => setEnteredEmail(e.target.value)}
            type="text"
            placeholder="Enter Your email"
            className={`border border-gray-300 text-sm focus:outline-none  p-2 rounded ${!formValidity.email ? "border border-red-500" : ""}`}
          />
          {!formValidity.email && <p className="text-red-500 text-sm">Please enter a valid email</p>}
        </div>

        <div className="flex flex-col gap-2 p-1">
          <label>Password</label>
          <input
            name="password"
            value={enteredPassword}
            ref={passwordInputRef}
            onChange={(e) => setEnteredPassword(e.target.value)}
            type="password"
            placeholder="Enter Your Password"
            className={`border border-gray-300 text-sm focus:outline-none p-2 rounded ${!formValidity.password ? "border border-red-500" : ""}`}
          />
          {!formValidity.password && <p className="text-red-500 text-sm">Please enter a more than six chars</p>}

        </div>

        <div className="flex flex-col gap-2 p-1">
          <label>Role</label>
          <select name="role"
            value={enteredRole}
            ref={roleInputRef}
            onChange={(e) => setEnteredRole(e.target.value)}
            className={`border border-gray-300 text-sm focus:outline-none p-2 rounded ${!formValidity.role ? "border border-red-500" : ""}`} >
            <option value="">Select Role</option>
            <option>Buyer</option>
            <option>Seller</option>
          </select>
          {!formValidity.role && <p className="text-red-500 text-sm">Role is required</p>}
        </div>

        <button type="submit" className="bg-black text-white py-2 mt-4 cursor-pointer rounded hover:opacity-75">Submit</button>

        <div className="text-sm flex justify-center mt-4">
          <span>Already user?</span>
          <Link to="/" className="ml-2 text-blue-500 underline">Login</Link>
        </div>
      </form>
    </div >
  )
}
