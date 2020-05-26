import axios from "axios"

const baseURL = process.env.REACT_APP_API_BASE_URL
const token = localStorage.getItem("Token") 

let options = {}
if(baseURL) options["baseURL"] = baseURL
if(token) options["Authorization"] = `Bearer ${token}`
let axiosInstance = axios.create(options)

export default axiosInstance
