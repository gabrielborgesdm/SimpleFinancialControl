import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import CountryHelpers from "../helpers/CountryHelpers"


class ExpensesDoughnut extends Component{
   
    constructor(props){
        super(props)
        this.expenses = this.props.expenses
        this.expensesData = []
        this.expensesSum = 0
        this.expensesLabel = []
        this.expensesColor = [
            '#85ef75',
            '#3f94a7',
            '#dc3545',
            '#ffcfd2',
            '#fffacc',
            '#c06e52',
            '#e8ae68',
            '#107e7d',
            '#72195a',
            '#ffaaee',
            '#1a090d',
            '#6b6570',
        ]
        this.translate = this.props.translate
    }

    componentDidMount(){
        this.expenses = this.props.expenses
        this.expensesData = []
        this.expensesSum = 0
        this.expensesLabel = []
        this.initChart()
    }

    componentDidUpdate(){
        this.expenses = this.props.expenses
        this.expensesData = []
        this.expensesSum = 0
        this.expensesLabel = []
        this.initChart()
    }

    initChart(){
        this.buildExpensesInfo()
        this.renderChart()
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
    buildExpensesInfo = () => {
        this.expenses.forEach((transaction)=>{
            if(this.expensesLabel.indexOf(transaction["category"]) === -1){
                this.expensesLabel.push(this.getCategory(transaction["category"]))
                this.expensesData.push(transaction.amount * -1)
                this.expensesSum += transaction.amount * -1
            } else {
                let indexOfExpense = this.expensesLabel.indexOf(transaction["category"])
                this.expensesData[indexOfExpense] += transaction.amount * -1
                this.expensesSum += transaction.amount * -1
            }
        })
    }

    renderChart = () => {
        let expensesCanvasDiv = document.querySelector("#expensesCanvasDiv")
        expensesCanvasDiv.innerHTML = ""
        expensesCanvasDiv.innerHTML = `<canvas id="expensesDoughnut" className="canvas"></canvas>`
        let ctx = document.getElementById('expensesDoughnut').getContext('2d')
        let { expensesSum } = this
        new Chart(ctx, {
            type: 'pie',
            plugins: [ChartDataLabels],
            data: {
                labels: this.expensesLabel,
                datasets: [{
                    data: this.expensesData,
                    backgroundColor: this.expensesColor,

                }]
            },
            options: {
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            let category = `${this.expensesLabel[tooltipItem['index']]}`
                            return [category, `${CountryHelpers.getStringMasked(data['datasets'][0]['data'][tooltipItem['index']])}`]
                        },
                    }
                },
                plugins: {
                    datalabels: {
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: 15,
                        anchor: "end",
                        align: "start",
                        formatter: (value, context) =>{
                            return `${(value * 100 / expensesSum).toFixed(0)}%`;
                        }
                    },
                    
                }
            },
        })
    }

    render = () => 
    <React.Fragment>
        <div id="expensesCanvasDiv">
            <canvas id="expensesDoughnut" className="canvas"></canvas>
        </div>
        <div className="col-12">
                <div className="row d-flex justify-content-center">
                    {this.expensesLabel.map((expense, index)=>
                        <div className="p-2" key={expense + index}>
                            <div className="d-inline-block mr-1 doughnut_legend" style={{backgroundColor: this.expensesColor[index]}}>&nbsp;</div>
                            <div className="d-inline-block"><small>{expense}</small></div>
                        </div> 
                    )}
                </div>
            </div>
    </React.Fragment>
     
}

export default ExpensesDoughnut