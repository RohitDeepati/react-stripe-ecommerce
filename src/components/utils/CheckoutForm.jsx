import { useState } from "react"

export const CheckoutForm = ({ formdata, setFormData, formdataError, setFormDataError }) => {
  // const [formdata, setFormData] = useState({
  //   name: "",
  //   street: "",
  //   mobile: ""
  // })

  // const [error, setError] = useState({
  //   name: "",
  //   street: "",
  //   mobile: ""
  // })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormdata) => ({
      ...prevFormdata,
      [name]: value
    }))
    if (name === "mobile" && value.length < 10) {
      setFormDataError((prev) => ({
        ...prev,
        mobile: "Please enter a valid mobile number",
      }));
    } else {
      setFormDataError((prev) => ({
        ...prev,
        mobile: "",
      }));
    }

    if (name === "street" && value.trim() === "") {
      setFormDataError((prev) => ({
        ...prev,
        street: "Street name is required",
      }));
    } else {
      setFormDataError((prev) => ({
        ...prev,
        street: "",
      }));
    }

    if (name === "name" && value.trim() === "") {
      setFormDataError((prev) => ({
        ...prev,
        name: "Name field is required",
      }));
    } else {
      setFormDataError((prev) => ({
        ...prev,
        name: "",
      }));
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // if (formdata.mobile === "" || formdata.mobile < 10) {
    //   setFormDataError({
    //     ...formdataError,
    //     mobile: "Please enter valid mobile number"
    //   })
    // }

    // if (formdata.street === "") {
    //   setFormDataError({
    //     ...formdataError,
    //     street: "Street name is required"
    //   })
    // }

    // if (formdata.name === "") {
    //   setFormDataError({
    //     ...formdataError,
    //     name: "Name field is required"
    //   })
    // }

  }


  return (
    <div>
      <form onSubmit={submitHandler} className="flex flex-col gap-1 m-2">
        <div className="flex justify-evenly gap-2">
          <label>Name:</label>
          <input value={formdata.name} onChange={handleChange} placeholder="Enter Full Name" className="bg-[whitesmoke] rounded px-2 outline-none" />
          {formdataError.name && <div className="text-red-500">{formdataError.name}</div>}
        </div>
        <div className="flex justify-evenly gap-2">
          <label >Street:</label>
          <input value={formdata.street} onChange={handleChange} placeholder="Enter Street" className="bg-[whitesmoke] rounded px-2 outline-none" />
          {formdataError.street && <div className="text-red-500">{formdataError.street}</div>}
        </div>
        <div className="flex justify-evenly gap-2">
          <label>Mobile:</label>
          <input value={formdata.mobile} onChange={handleChange} placeholder="Enter Mobile" className="bg-[whitesmoke] rounded px-2 outline-none" />
          {formdataError.mobile && <div className="text-red-500">{formdataError.mobile}</div>}
        </div>
      </form>
    </div>
  )
}