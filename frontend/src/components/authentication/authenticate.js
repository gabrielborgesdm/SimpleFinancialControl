import axios from "axios"



const authenticate = (props) => {
    const desauthenticate = () => {
        localStorage.removeItem("Token")
        window.location.href = '/'
    }
    
    const token = localStorage.getItem("Token") 
    const baseUrl = process.env.REACT_APP_API_BASE_URL

    if (token) {
        const url = `${baseUrl}/accounts/` 
        axios.get(url)
        .catch(error => {
            if(error.response.status === 403) {
                desauthenticate()
            } 
        })

    } else{
        desauthenticate()
    }
} 

export default authenticate