import axios from "axios"
import {API_BASE_URL} from "react-native-dotenv"
const baseURL = API_BASE_URL
//const token = localStorage.getItem("Token") 
let token

let options = {}
if(baseURL) options["baseURL"] = baseURL
if(token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
let axiosInstance = axios.create(options)

export default axiosInstance
