import NetInfo from "@react-native-community/netinfo";

export const checkIsOnline = async () => {
    let state = await NetInfo.fetch()
    return state.isConnected
}