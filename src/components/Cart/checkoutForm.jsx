import { useContext, useEffect, useRef, useState } from "react"
import { checkoutSessionApi } from "../../api/stripePayment"
import { ShoppingContext } from "../store/EcommerceContext"


const isEmpty = (value) => value.trim() === ""
const isSixChars = (value) => value.trim().length === 6

export const CheckOutForm = () => {
  const { items, email } = useContext(ShoppingContext)

  const [formValidity, setFormValidity] = useState({
    name: true,
    landmark: true,
    zipcode: true
  })
  const [enteredName, setEnteredName] = useState("")
  const [enteredLandmark, setEnteredLandmark] = useState("")
  const [enteredZipcode, setEnteredZipCode] = useState("")

  const nameInputRef = useRef()
  const landmarkInputRef = useRef()
  const zipcodeInputRef = useRef()

  const inputFormIsValid = () => {
    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredLandmarkIsValid = !isEmpty(enteredLandmark)
    const enteredZipcodeIsValid = isSixChars(enteredZipcode)

    setFormValidity({
      name: enteredNameIsValid,
      landmark: enteredLandmarkIsValid,
      zipcode: enteredZipcodeIsValid
    })

    const formIsValid = enteredNameIsValid && enteredLandmarkIsValid && enteredZipcodeIsValid

    return formIsValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!inputFormIsValid()) {
      return
    }
    postCheckOutSession()
  }

  const dataTosumbit = items?.map((item) => ({
    productName: item.productName,
    productTitle: item.productTitle,
    quantity: item.quantity,
    price: item.productPrice * 100,
    image_url: item.image
  }));


  const handlePaymentSuccess = () => {
    localStorage.removeItem(`cartitems${email}`)
    console.log("cart items removed from the local storage")
  }

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search)

    const sessionId = urlParams.get("session_id")

    if (sessionId) {
      handlePaymentSuccess()
    }
  }, [email])


  const postCheckOutSession = async () => {
    try {
      const response = await checkoutSessionApi(dataTosumbit);
      console.log("response", response.data)
      console.log("checkout-response", response?.data)

      if (response.data?.session?.url) {
        window.location.href = response.data.session.url;
      } else {
        console.error("Error: no url received");
      }
    } catch (error) {
      console.error("Error during checkout session creation", error);
    }

  };



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-2">

      <div className="flex flex-col">
        <label className="text-sm font-medium">Name:</label>
        <input
          value={enteredName}
          name="name"
          ref={nameInputRef}
          onChange={(e) => setEnteredName(e.target.value)}
          className="bg-white outline-none px-2 py-1 text-sm rounded border border-gray-300"
        />
        {!formValidity.name && <div className="text-red-500 text-xs mt-1">Please enter a valid name</div>}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Landmark:</label>
        <input
          value={enteredLandmark}
          name="landmark"
          ref={landmarkInputRef}
          onChange={(e) => setEnteredLandmark(e.target.value)}
          className="bg-white outline-none px-2 py-1 text-sm rounded border border-gray-300"
        />
        {!formValidity.landmark && <div className="text-red-500 text-xs mt-1">Please enter a valid landmark</div>}
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">ZipCode:</label>
        <input
          name="zipcode"
          value={enteredZipcode}
          ref={zipcodeInputRef}
          onChange={(e) => setEnteredZipCode(e.target.value)}
          className="bg-white outline-none px-2 py-1 text-sm rounded border border-gray-300"
        />
        {!formValidity.zipcode && <div className="text-red-500 text-xs">Please enter a valid six chars zipcode</div>}
      </div>
      <div className="">
        <button className="cursor-pointer text-center m-2 bg-black text-white px-2 py-1 rounded cursor-pointer hover:opacity-75" type="submit" >Checkout with stripe</button>
      </div>
    </form>

  )
}