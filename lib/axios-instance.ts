import axios from "~node_modules/axios"

const axiosInstance = axios.create({
  baseURL: process.env.PLASMO_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance
