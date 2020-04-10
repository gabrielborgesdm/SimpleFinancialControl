import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

class ExpensesLines extends Component{
    constructor(props){
        super(props)
        this.expenses = this.props.expenses
    }
    
    componentDidMount(){
        this.initChart()
    }

    initChart(){
        this.groupByDate()
        this.expensesDates = this.expenses.map((expense)=>expense.date)
        this.expensesValues = this.expenses.map((expense)=>expense.amount)
        this.renderChart()
    }
    
    groupByDate = () => {
        let expenses = this.expenses
        let groupedExpenses = []
        expenses = this.sortDate(expenses)
        expenses.forEach((expense, index, expenses)=>{
            let expenseGroup = {amount: 0}
            expenses.reduce((previous, after)=>{
                let checkSameDate = true
                if(this.getYear(expense["transactionDate"]) !== this.getYear(after["transactionDate"])) checkSameDate = false
                if(this.getMonth(expense["transactionDate"]) !== this.getMonth(after["transactionDate"])) checkSameDate = false
                if(checkSameDate){
                    let date = `${this.getMonth(after["transactionDate"])}/${this.getYear(after["transactionDate"])}`
                    let amount = expenseGroup.amount + after["amount"] * -1
                    expenseGroup = {date, amount}
                }
                return after
            }, {})
            groupedExpenses.push(expenseGroup)
        })
        groupedExpenses = this.removeDuplicatedGroupedExpenses(groupedExpenses)
        this.expenses = groupedExpenses
    }
    
    sortDate = transactions => transactions.sort((a, b) => a["transactionDate"] >= b["transactionDate"] ? 1 : -1)
    
    getYear = date => date.split("-")[0]
    
    getMonth = date => date.split("-")[1]

    removeDuplicatedGroupedExpenses = groupedExpenses => {
        groupedExpenses = groupedExpenses.map((expense=>JSON.stringify(expense)))
        let withoutDuplicate = [...new Set(groupedExpenses)]
        groupedExpenses = withoutDuplicate.map((expense)=>JSON.parse(expense))
        return groupedExpenses
    }
    
    renderChart = () => {
        let ctx = document.getElementById('expensesLines').getContext('2d')
        new Chart(ctx, {
            type: 'line',
            plugins: [ChartDataLabels],
            data: {
                labels: this.expensesDates,
                datasets: [{
                    borderColor: "#dc3545",
                    fill: false,
                    label: 'Monthly Expenses',
                    data: this.expensesValues,

                }]
            },
            options: {
                plugins: {
                    datalabels: {
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: 5,
                        anchor: "end",
                        align: "top",
                        formatter: function(value, context) {
                            return `${value}`;
                        }
                    },
                    
                },
                scales: {
					
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Money'
						}
					}]
				}
            }
        })
    }

    render = () => 
    <canvas id="expensesLines"></canvas>
}

export default ExpensesLines