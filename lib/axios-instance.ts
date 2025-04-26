import axios from "~node_modules/axios"

const axiosInstance = axios.create({
  baseURL: process.env.PLASMO_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance

// src/lib/axios-instance.ts
// import axios from "axios"

// const axiosInstance = axios.create({
//   baseURL: process.env.PLASMO_PUBLIC_BACKEND_URL,
//   timeout: 45000, // 45 seconds
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json"
//   }
// })

// // Request interceptor - could add auth token here
// axiosInstance.interceptors.request.use(
//   (config) => {
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error("API Error:", error.response.data)
//     } else if (error.request) {
//       console.error("Network Error:", error.request)
//     } else {
//       console.error("Request Error:", error.message)
//     }
//     return Promise.reject(error)
//   }
// )

// export default axiosInstance
