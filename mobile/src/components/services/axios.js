import axios from "axios"
import {API_BASE_URL} from "react-native-dotenv"
import {getToken} from "../helpers/StorageHelpers"


export const getAxiosInstance = async () => {
    const baseURL = API_BASE_URL
    const token = await getToken()

    let options = {}
    if(baseURL) options["baseURL"] = baseURL
    if(token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    let axiosInstance = axios.create(options)
    return axiosInstance
}




