import axios from "axios";

const getToken = () => localStorage.getItem("token");

const ordersAPI = axios.create({
  baseURL: "http://localhost:9090",
});

ordersAPI.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve the token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to header
    }

    return config; // Return the updated config
  },
  (error) => Promise.reject(error) // Reject the promise in case of error
);

export const createOrder = (data) => ordersAPI.post("/orders", data);
export const getOrdersByUserEmail = (email) =>
  ordersAPI.get(`/orders?email=${email}`);

// export const getItemsByEmail = (email) =>
//   ordersAPI.get(`/cartitems?email=${email}`);
