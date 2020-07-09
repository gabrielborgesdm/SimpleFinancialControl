import React, {Component} from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'

export default class Popup extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: "",
            type: this.props.type || "warning",
            animatedValue: new Animated.Value(0)
        }
    }

    getPopupType = () => {
        let type = this.props.type
        let typeKey = ""
        switch (type) {
            case "success":
                typeKey = "success"
                break
            default:
                typeKey = "warning"
                break
        }
        return typeKey
    }

    slideIn = () => {
        Animated.timing(this.state.animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
    };
    
    slideOut = (callback = null) => {
        Animated.timing(this.state.animatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start(callback);
    };

    getPopupStyle = (styleType) => this.getStyle(styleType, this.state.type)

    getStyle = (styleType, popupType) => styles[`${styleType}_${popupType}`]

    getPopupIcon = () => <FontAwesomeIcon style={[styles.popupIcon, this.getPopupStyle("color")]} icon={ this.state.type === "success" ? faCheck : faExclamation} />
    
    setNewMessage = () => {
        this.setState({message: this.props.message}, ()=>{
            this.slideIn()
        })
    }

    componentDidMount(prevProps){
        this.setState({message: this.props.message})
        this.setState({ type: this.getPopupType()})
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.message !== this.props.message){
            if(prevProps.message){
                this.slideOut(this.setNewMessage)
            } else {
                this.setNewMessage()
            }
             
        }
    }

    render = () =>
        <Animated.View style={[{
            transform: [
                {
                  translateX: this.state.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0]
                  })
                }
            ],
        }, styles.popupView, this.getPopupStyle("bg"), { display: this.state.message ? "flex" : "none", position: this.state.message ? "absolute" : "relative"}]}>
            {this.getPopupIcon()}
            <Text style={[this.getPopupStyle("color"), styles.message]}>{this.state.message}</Text>
        </Animated.View>
}

const styles = StyleSheet.create({
    popupView: {
        padding: 20,
        backgroundColor: "#fff",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        zIndex: 100,
        flexDirection: "row",
        right: 0,
    },

    bg_success: { backgroundColor: "#399A68" },

    bg_warning: { backgroundColor: "#FFC857" },

    color_success: { color: "#fff" },

    color_warning: { color: "#47484a" },

    message: {
        alignSelf: "center",
        textAlign: "right"
    },

    popupIcon: {
        alignSelf: "center",
        marginRight: 10,
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