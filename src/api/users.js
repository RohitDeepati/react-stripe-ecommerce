import axios from "axios";

const getToken = () => localStorage.getItem("token");

const usersAPI = axios.create({
  baseURL: "https://go-stripe-ecommerce-production.up.railway.app",
});

usersAPI.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve the token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to header
    }

    return config; // Return the updated config
  },
  (error) => Promise.reject(error) // Reject the promise in case of error
);

export const addNewUser = (data) => usersAPI.post("/signup", data);

export const getUsers = () => usersAPI.get("/users");

export const loginuser = (data) => usersAPI.post("/login", data);

export const getUserByEmail = (email) => usersAPI.get(`/users?email=${email}`);

export const deleteUserByEmail = (email) =>
  usersAPI.delete(`/users?email=${email}`);
