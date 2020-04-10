import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

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
            '#1a090d',
            '#6b6570',
        ]
    }

    componentDidMount(){
        this.initChart()
    }

    initChart(){
        this.buildExpensesInfo()
        this.renderChart()
    }

    buildExpensesInfo = () => {
        this.expenses.forEach((transaction)=>{
            this.expensesLabel.push(transaction["category"])
            this.expensesData.push(transaction.amount * -1)
            this.expensesSum += transaction.amount * -1
        })
    }

    renderChart = () => {
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
                            return `${(value * 100 / expensesSum).toFixed(0)}%`;
                        }
                    },
                    
                }
            },
        })
    }

    render = () => <canvas id="expensesDoughnut" className="canvas"></canvas>
     
}

export default ExpensesDoughnut