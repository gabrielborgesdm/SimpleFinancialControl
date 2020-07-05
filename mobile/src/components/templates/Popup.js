import React, {Component} from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faEnvelope, faLock, faCheckCircle, faCircle, faExclamation, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { color } from "react-native-reanimated"
import { TouchableOpacity } from "react-native-gesture-handler"

export default class Popup extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: ""
        }
    }

    componentDidMount(prevProps){
        this.setState({message: this.props.message})
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.message !== this.props.message){
            console.log(this.state.message.length)
            this.setState({message: this.props.message})
        }
    }

    closeModal = () => {
        this.setState({message: ""})
    }

    render = () =>
        <View style={[styles.popupView, { display: this.state.message ? "flex" : "none", position: this.state.message ? "absolute" : "relative"}]}>
            <FontAwesomeIcon style={styles.exclamationIcon} icon={faExclamation} />
            <Text style={styles.message}>{this.state.message}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={()=>this.closeModal()}>
                <FontAwesomeIcon style={styles.closeIcon} size={20} icon={faTimesCircle} />
            </TouchableOpacity>
        </View>
}

const styles = StyleSheet.create({
    popupView: {
        padding: 20,
        backgroundColor: "#fff",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: "#FFC857",
        zIndex: 100,
        flexDirection: "row",
        right: 0,
        top: 80,
    },

    message: {
        color: "#47484a",
        paddingHorizontal: 20,
        alignSelf: "center"
    },

    exclamationIcon: {
        alignSelf: "center",
        color: "#47484a",
    },

    closeButton: {
        alignSelf: "center",
        padding: 2
    },
    closeIcon: {
        alignSelf: "center",
        color: "#D33F49",
    }
})