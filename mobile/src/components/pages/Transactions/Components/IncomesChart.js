import React, { Component } from "react"
import { View, ScrollView, Dimensions, TouchableOpacity, Text } from "react-native"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { LineChart } from "react-native-chart-kit"

import { getCoinPrefix } from "../../../helpers/LocationHelpers"
import { styles, colors } from "../../../../assets/Styles"
const { chartArrow, chartArrowIcon } = styles
const { lightBlue, red } = colors


export default class IncomesChart extends Component {

    constructor(props){
        super(props)
        this.state = {
            chartWidth: null,
            lastDateType: "",
            scrollViewWidth: 0,
            currentXOffset: 0
        }
        this.scrollView = null
        this.scrolling = null
        this.transactionsColors = [lightBlue, lightBlue, lightBlue, red, lightBlue, lightBlue, lightBlue, lightBlue, lightBlue, lightBlue, red]
        this.colorsIndex = 0
    }

    getTransactionsLabels = () => {
        let transactions = this.props.transactions
        let labels =  transactions.map(transaction=>transaction.transactionDateFormatted)
        labels = ["09/10/1968", "09/10/1968", "09/10/1968", "09/10/1968", "09/10/1968", "09/10/1968", "09/10/1968", "09/10/1968", "09/10/1968", "09/10/1968", "09/10/1968"]
        return labels
    }
    
    getDataset = () => {
        let transactions = this.props.transactions
        let dataset =  transactions.map(transaction=>transaction.amount)
        dataset = [10, 20, 30, -400, 500, 23, 43, 65, 48, 92, 0]
        return dataset
    }

    getChartWidth = () => {
        
        let width = Dimensions.get("window").width 
        console.log(this.props.transactions.length)
        width = this.props.transactions.length * 600
        width = Dimensions.get("window").width > width ? Dimensions.get("window").width : width
        this.setState({chartWidth: width})
    }

    getChartColor = () => {
        let color = this.transactionsColors[this.colorsIndex]
        console.log(color)
        this.colorsIndex++
        return color
    }


    _handleScroll = (event) => {
        newXOffset = event.nativeEvent.contentOffset.x
        this.setState({currentXOffset:newXOffset})
    }
    
    leftArrow = (eachItemOffset) => {
        eachItemOffset = this.state.scrollViewWidth / 10; // Divide by 10 because I have 10 <View> items
        _currentXOffset =  this.state.currentXOffset - eachItemOffset;
        this.scrollView.scrollTo({x: _currentXOffset, y: 0, animated: true})
    }
    
    rightArrow = (eachItemOffset) => {
        eachItemOffset = this.state.scrollViewWidth / 10; // Divide by 10 because I have 10 <View> items 
        _currentXOffset =  this.state.currentXOffset + eachItemOffset;
        this.scrollView.scrollTo({x: _currentXOffset, y: 0, animated: true})
    }

    onLongPress = (direction) => {
        this.scrolling = setInterval(()=>{
            if(direction === "right"){
                this.rightArrow(20)
            } else{
                this.leftArrow(20)
            }
        }, 10)
    }

    onPressOut = () => this.scrolling = clearInterval(this.scrolling)

    componentDidUpdate = (prevProps) => {
        if(this.props.route.params && this.props.route.params && this.props.route.params.dateFilterTypeHasChanged) {
            this.props.navigation.setParams({dateFilterTypeHasChanged: false})
            this.getChartWidth()
        }

        if(this.props.transactions.length !== prevProps.transactions.length){
            this.getChartWidth()
        }
    }

    renderChart = () => {
        return (
            <LineChart
                data={{
                    labels: this.getTransactionsLabels(),
                    datasets: [{ data: this.getDataset() }]
                }}
                width={this.state.chartWidth} // from react-native
                height={220}
                yAxisLabel={this.props.user.country === "brazil" ? "R$" : "$"}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#fff"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    marginHorizontal: 18,
                    borderRadius: 16
                }}
            />
        )
    }

    render =  () =>
        (this.props.transactions && this.props.transactions.length > 0) ?
            <View style={{flexDirection: "row"}}>
                {(this.state.scrollViewWidth && this.state.currentXOffset > 0) ?
                    <TouchableOpacity onPress={this.leftArrow} onLongPress={()=>this.onLongPress("left")} onPressOut={this.onPressOut} style={[chartArrow, {left: 10}]}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} style={chartArrowIcon} size={20} />
                    </TouchableOpacity>
                : false}
                <ScrollView 
                    disableScrollViewPanResponder={true}
                    horizontal={true} 
                    invertStickyHeaders={true} 
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={(width) => {
                        this.setState({scrollViewWidth:width})
                        this.scrollView.scrollToEnd({animated: true})
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    pagingEnabled={true}
                    scrollEventThrottle={16}
                    scrollEnabled={false}
                    onScroll={this._handleScroll}
                    >
                    {this.renderChart()}
                </ScrollView>
                {(this.state.scrollViewWidth && parseInt(this.state.currentXOffset + Dimensions.get("screen").width) < parseInt(this.state.scrollViewWidth)) ?
                    <TouchableOpacity onPress={this.rightArrow} onLongPress={()=>this.onLongPress("right")} onPressOut={this.onPressOut} style={[chartArrow, {right: 10}]}>
                        <FontAwesomeIcon icon={faArrowCircleRight}  style={chartArrowIcon} size={20} />
                    </TouchableOpacity>
                
                : false}
            </View>
        
        :
            <View>
                {(!this.props.route.params || !this.props.route.params.dateFilter) ?
                    <Text>Carregando</Text>
                :
                    <Text>não tem transacoes</Text>
                }
            </View>
}