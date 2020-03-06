import axios from "axios"

const initialState = {
    token: localStorage.getItem("Token"),
    isAuthenticated: false,
    isLoading: false,
    user: null
}

const Authenticate = () => {
    const state = initialState
    state.isLoading = true
    axios.defaults.headers["Authorization"] = `Bearer ${initialState.token}`
    const url = `${process.env.REACT_APP_API_BASE_URL}/accounts/account`
    axios.get(url)
    .then((response)=>{
        if(response.data.success) {
            state.isAuthenticated = true
            state.isLoading = false
            state.user = response.data.user
        }
    })
    console.log(state)
    return state
}
export default Authenticate