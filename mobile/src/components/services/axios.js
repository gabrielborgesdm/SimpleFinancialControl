import axios from "axios"
import {API_BASE_URL} from "react-native-dotenv"
import {getToken} from "../helpers/StorageHelpers"


const axiosIntance = axios.create({
    baseURL: API_BASE_URL
})

axiosIntance.interceptors.request.use(async (config) => {
    const token = await getToken()
    if(token != null){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
    },
    (error) => {
        console.log(error)
    }
)


export default axiosIntance


