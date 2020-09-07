import React, { Component } from "react"
import { View, Text, Dimensions } from "react-native"
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit"
import { styles, colors } from "../../../../assets/Styles"
const { flex1, h1, h3, h4, textWhite, textSm, textLightGreen, flexRow, textRed, roundedBox, justifySpaceAround, flexGrow1, textBold, fullWidthImage, minimalistInputGroup, buttonMinimalist, textDarkGrey, p2, mx2, my5 } = styles
const { lightBlue, lightGreen } = colors


export default class IncomesChart extends Component {

    render =  () =>
        <View style={[mx2]}>
            {/* <LineChart
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [{
                      data: [ 20, 45, 28, 80, 99, 43 ],
                      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                      strokeWidth: 2 // optional
                    }],
                    legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
                  }}
                width={Dimensions.get("window").width - 28} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                onDataPointClick={(data)=>{
                    console.log(data)
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            /> */}
        </View>
}