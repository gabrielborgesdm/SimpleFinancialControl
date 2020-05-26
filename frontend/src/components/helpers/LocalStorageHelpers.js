 
const setStorages = (data) => {
    let {token, name, email, country} = data
    localStorage.setItem("Token", token)
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("country", country)
}

const resetStorages = () => {
    localStorage.removeItem("Token")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("country")
}

module.exports = {
    setStorages,
    resetStorages
}