import AsyncStorage from "@react-native-community/async-storage"

export const setStorages = async (data) => {
    let {token, name, email, country} = data
    let success = true
    try {
        await AsyncStorage.setItem("@token", token)
        await AsyncStorage.setItem("@name", name)
        await AsyncStorage.setItem("@email", email)
        await AsyncStorage.setItem("@country", country)
    } catch (error){
        success = false
    }
    return success
}

export const getToken =  async () => {
    let token = null
    try {
        token = await AsyncStorage.getItem("@token")
        
    } catch (error) {
        token = false
    }
    return token
}

export const getUser =  async () => {
    let user = {}
    try {
        user["name"] = await AsyncStorage.getItem("@name")
        user["email"] = await AsyncStorage.getItem("@email")
        user["country"] = await AsyncStorage.getItem("@country")
    } catch (error) {
        user = false
    }
    return user
}

export const checkIsNotFirstAccess = async () => {
    let checkIsNot = false
    try {
        checkIsNot = await AsyncStorage.getItem("@isNotFirstAccess")
        
    } catch (error) {
        checkIsNot = false
    }
    return checkIsNot
}

export const setIsNotFirstAccess = async () => {
    let checkIsNot = false
    try {
        checkIsNot = await AsyncStorage.setItem("@isNotFirstAccess", "true")
        
    } catch (error) {
        checkIsNot = false
    }
    return checkIsNot
}

export const resetUserStorages = async () => {
    await AsyncStorage.removeItem("@token")
    await AsyncStorage.removeItem("@name")
    await AsyncStorage.removeItem("@email")
    await AsyncStorage.removeItem("@country")
}