import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

class IncomesDoughnut extends Component{
   
    constructor(props){
        super(props)
        this.state = {
            canvas: ""
        }
        this.incomes = []
        this.incomesData = []
        this.incomesSum = 0
        this.incomesLabel = []
        this.incomesColor = [
            '#85ef75',
            '#3f94a7',
            '#dc3545',
            '#ffcfd2',
            '#fffacc',
            '#c06e52',
            '#e8ae68',
            '#107e7d',
            '#72195a',
            '#1a090d',
            '#6b6570',
        ]
    }

    componentDidMount(){
        this.incomesData = []
        this.incomesSum = 0
        this.incomesLabel = []
        this.incomes = this.props.incomes
        this.initChart()
    }

    componentDidUpdate(){
        this.incomesData = []
        this.incomesSum = 0
        this.incomesLabel = []
        this.incomes = this.props.incomes
        this.initChart()
    }

    initChart(){
        this.buildIncomesInfo()
        this.renderChart()
    }

    buildIncomesInfo = () => {
        this.incomes.forEach((transaction)=>{
            if(this.incomesLabel.indexOf(transaction["category"]) === -1){
                this.incomesLabel.push(transaction["category"])
                this.incomesData.push(transaction.amount)
                this.incomesSum += transaction.amount 
            } else {
                let indexOfExpense = this.incomesLabel.indexOf(transaction["category"])
                this.incomesData[indexOfExpense] += transaction.amount 
                this.incomesSum += transaction.amount 
            }
        })
    }

    renderChart = () => {
        let incomesCanvasDiv = document.querySelector("#incomesCanvasDiv")
        incomesCanvasDiv.innerHTML = ""
        incomesCanvasDiv.innerHTML = `<canvas id="incomesDoughnut" className="canvas"></canvas>`

        let canvas = document.getElementById('incomesDoughnut');
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let { incomesSum } = this
        new Chart(ctx, {
            type: 'pie',
            plugins: [ChartDataLabels],
            data: {
                labels: this.incomesLabel,
                datasets: [{
                    data: this.incomesData,
                    backgroundColor: this.incomesColor,

                }]
            },
            options: {
                legend: {
                    display: document.getElementsByTagName("body")[0].clientWidth <= 568 ? false: true,
                },
                plugins: {
                    datalabels: {
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: 15,
                        anchor: "end",
                        align: "start",
                        formatter: function(value, context) {
                            return `${(value * 100 / incomesSum).toFixed(0)}%`;
                        }
                    },
                    
                }
            },
        })
    }

    getClientWidth = () => document.getElementsByTagName("body")[0].clientWidth

    render = () =>  
        <div id="incomesCanvasDiv">
            <canvas id="incomesDoughnut" className="canvas"></canvas>
        </div>
     
}

export default IncomesDoughnut