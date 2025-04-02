import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import { addNewUser } from "../../api/users"
import { ShoppingContext } from "../store/EcommerceContext"

export const SignupUser = () => {
  const navigate = useNavigate()
  const { setEmail } = useContext(ShoppingContext)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })

  const [errors, setErrors] = useState({
    server: ""
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

  }

  const submitHandler = async (e) => {
    e.preventDefault()

    setErrors((prevErrors) => ({
      ...prevErrors,
      server: ""
    }))

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
        setErrors((prevErrors) => ({
          ...prevErrors,
          server: error.response.data.error
        }))
      }
    }

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-[whitesmoke] rounded-lg shadow-lg border border-gray-300">
      <header className="font-semibold text-center text-xl p-2">New Account?</header>
      <form onSubmit={submitHandler} className="flex flex-col">
        {errors.server && <div className="text-center text-red-500 text-sm">{errors.server}</div>}
        <div className="flex flex-col gap-2 p-1">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Enter your Name" className={`border border-gray-300 text-sm focus:outline-none  p-2 rounded ${errors.server === "All fields are required" ? "border border-red-500" : ""}`} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2 p-1">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} type="text" placeholder="Enter Your email" className={`border border-gray-300 text-sm focus:outline-none  p-2 rounded ${errors.server === "Invalid email format" || errors.server === "All fields are required" || errors.server === "Email is required" ? "border border-red-500" : ""}`} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-2 p-1">
          <label>Password</label>
          <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Enter Your Password" className={`border border-gray-300 text-sm focus:outline-none  p-2 rounded ${errors.server === "All fields are required" || errors.server == "Password is required" ? "border border-red-500" : ""}`} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="flex flex-col gap-2 p-1">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className={`border border-gray-300 text-sm focus:outline-none  p-2 rounded ${errors.server === "All fields are required" || errors.server == "Role is required" ? "border border-red-500" : ""}`} >
            <option value="">Select Role</option>
            <option>Buyer</option>
            <option>Seller</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <button type="submit" className="bg-black text-white py-2 mt-4 cursor-pointer rounded hover:opacity-75">Submit</button>

        <div className="text-sm flex justify-center mt-4">
          <span>Already user?</span>
          <Link to="/" className="ml-2 text-blue-500 underline">Login</Link>
        </div>
      </form>
    </div>
  )
}
