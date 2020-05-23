import axios from "axios"



const authenticate = (props) => {
    const desauthenticate = () => {
        localStorage.removeItem("Token")
        window.location.href = '/'
    }
    
    const token = localStorage.getItem("Token") 
    const baseUrl = process.env.REACT_APP_API_BASE_URL
    axios.defaults.headers["Authorization"] = `Bearer ${token}`

    if (token) {
        
        const url = `${baseUrl}/accounts/account` 
        axios.get(url)
        .then(response => { 
            if(response.status === 200) {
                if (response.data.errors) {
                    desauthenticate()
                }
            } else {
                desauthenticate()
            }
        })
        .catch(error => {
            desauthenticate()
        }) 

    } else{
        desauthenticate()
    }
} 

export default authenticate