import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import CountryHelpers from "../helpers/CountryHelpers"

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
        this.translate = this.props.translate
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
            if(this.incomesLabel.indexOf(this.getCategory(transaction["category"])) === -1){
                this.incomesLabel.push(this.getCategory(transaction["category"]))
                this.incomesData.push(transaction.amount)
                this.incomesSum += transaction.amount 
            } else {
                let indexOfExpense = this.incomesLabel.indexOf(this.getCategory(transaction["category"]))
                this.incomesData[indexOfExpense] += transaction.amount 
                this.incomesSum += transaction.amount 
            }
        })
    }

    getCategory = (key) => {
        let category
        switch(key){
            case "others": 
                category = this.translate('CHARTS_CATEGORY_OTHERS')
                break
            case "food": 
                category = this.translate('CHARTS_CATEGORY_FOOD')
                break
            case "shopping": 
                category = this.translate('CHARTS_CATEGORY_SHOPPING')
                break
            case "housing": 
                category = this.translate('CHARTS_CATEGORY_HOUSING')
                break
            case "transportation": 
                category = this.translate('CHARTS_CATEGORY_TRANSPORTATION')
                break
            case "vehicle": 
                category = this.translate('CHARTS_CATEGORY_VEHICLE')
                break
            case "entertainment": 
                category = this.translate('CHARTS_CATEGORY_ENTERTAINMENT')
                break
            case "technology": 
                category = this.translate('CHARTS_CATEGORY_TECHNOLOGY')
                break
            case "education": 
                category = this.translate('CHARTS_CATEGORY_EDUCATION')
                break
            case "investments": 
                category = this.translate('CHARTS_CATEGORY_INVESTMENTS')
                break
            case "expenses": 
                category = this.translate('CHARTS_CATEGORY_EXPENSES')
                break
            case "work": 
                category = this.translate('CHARTS_CATEGORY_WORK')
                break
            default: 
                category = key
                break
        }
        return category
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
                    display: false,
                },
                plugins: {
                    datalabels: {
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: 15,
                        anchor: "end",
                        align: "start",
                        formatter: function(value, context) {
                            if((value * 100 / incomesSum) < 3) return null
                            return `${(value * 100 / incomesSum).toFixed(0)}%`;
                        }
                    },
                    
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            let category = `${this.incomesLabel[tooltipItem['index']]}`
                            return [category, `${CountryHelpers.getStringMasked(data['datasets'][0]['data'][tooltipItem['index']])}`]
                        },
                    }
                },
            },
        })
    }

    getClientWidth = () => document.getElementsByTagName("body")[0].clientWidth

    render = () =>  
        <React.Fragment>
            <div id="incomesCanvasDiv">
                <canvas id="incomesDoughnut" className="canvas"></canvas>
            </div>
            <div className="col-12">
                <div className="row d-flex justify-content-center">
                    {this.incomesLabel.map((income, index)=>
                        <div className="p-2" key={income + index}>
                            <div className="d-inline-block mr-1 doughnut_legend" style={{backgroundColor: this.incomesColor[index]}}>&nbsp;</div>
                            <div className="d-inline-block"><small>{income}</small></div>
                        </div> 
                    )}
                </div>
            </div>

        </React.Fragment>
}

export default IncomesDoughnut