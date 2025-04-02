import axios from "axios";

const getToken = () => localStorage.getItem("token");

const productsAPI = axios.create({
  baseURL: "http://localhost:9090/",
});

productsAPI.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve the token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to header
    }

    return config; // Return the updated config
  },
  (error) => Promise.reject(error) // Reject the promise in case of error
);

export const getProducts = () => productsAPI.get("/products");

export const addNewProduct = (data) => productsAPI.post("/newproducts", data);
