import axios from "~node_modules/axios"

const axiosInstance = axios.create({
  baseURL: "https://prgpt-api.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance
