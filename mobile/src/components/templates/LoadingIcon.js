import React, { Component } from "react"
import { Animated, Easing } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSpin, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default class LoadingIcon extends Component {
    constructor(props){
        super(props)
        this.spinValue = new Animated.Value(0)
    }

    spin () {
        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true,
          }
        ).start(() => this.spin())
      }
    
    componentDidMount = () => {
    this.spin()
    }

    render = () => 
        <Animated.View style={{transform: [{
            rotate: this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
            })
        }]}}>
            <FontAwesomeIcon size={this.props.size}  style={this.props.style} icon={faSpinner} />
        </Animated.View>
}