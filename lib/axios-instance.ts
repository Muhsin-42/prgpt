import axios from "~node_modules/axios"

const axiosInstance = axios.create({
  // baseURL: "http://72.61.232.2:1408",
  baseURL: "http://localhost:4001",
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance
