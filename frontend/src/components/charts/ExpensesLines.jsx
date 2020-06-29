import "./charts.css"
import React, { Component } from "react"
import CountryHelpers from "../helpers/CountryHelpers"
import DateHelpers from "../helpers/DateHelpers"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

class ExpensesLines extends Component{
    constructor(props){
        super(props)
        this.translate = this.props.translate
    }
    componentDidMount(){
        this.expenses = this.props.expenses
        this.initChart()
        
    }

    componentDidUpdate(){
        this.expenses = this.props.expenses
        this.initChart()
    }

    initChart(){
        if(this.props.groupedBy === "week" || this.props.groupedBy === "month") {
            this.groupByDay()
        } else {
            this.groupByMonth()
        }

        this.expensesDates = this.expenses.map((expense)=>expense.date)
        this.expensesValues = this.expenses.map((expense)=>expense.amount)
        this.renderChart()
    }
    
    groupByDay = () => {
        let expenses = this.expenses
        let groupedExpenses = []
        expenses = this.sortDate(expenses)
        expenses.forEach((expense, index, expenses)=>{
            let expenseGroup = {amount: 0}
            expenses.reduce((previous, after)=>{
                let checkSameDate = true
                if(DateHelpers.getDay(expense["transactionDate"]) !== DateHelpers.getDay(after["transactionDate"])) checkSameDate = false
                if(checkSameDate){
                    let date = DateHelpers.getDayAndMonth(after["transactionDate"])
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
    
    groupByMonth = () => {
        let expenses = this.expenses
        let groupedExpenses = []
        expenses = this.sortDate(expenses)
        expenses.forEach((expense, index, expenses)=>{
            let expenseGroup = {amount: 0}
            expenses.reduce((previous, after)=>{
                let checkSameDate = true
                if(DateHelpers.getYear(expense["transactionDate"]) !== DateHelpers.getYear(after["transactionDate"])) checkSameDate = false
                if(DateHelpers.getMonth(expense["transactionDate"]) !== DateHelpers.getMonth(after["transactionDate"])) checkSameDate = false
                if(checkSameDate){
                    let date = DateHelpers.getMonthAndYear(after["transactionDate"])
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

    removeDuplicatedGroupedExpenses = groupedExpenses => {
        groupedExpenses = groupedExpenses.map((expense=>JSON.stringify(expense)))
        let withoutDuplicate = [...new Set(groupedExpenses)]
        groupedExpenses = withoutDuplicate.map((expense)=>JSON.parse(expense))
        return groupedExpenses
    }
    
    renderChart = () => {
        let expensesLinesDiv = document.querySelector("#expensesLinesDiv")
        expensesLinesDiv.innerHTML = ""
        expensesLinesDiv.innerHTML = `<canvas id="expensesLines" className="canvas"></canvas>`
        let ctx = document.getElementById('expensesLines').getContext('2d')
        new Chart(ctx, {
            type: 'line',
            plugins: [ChartDataLabels],
            data: {
                labels: this.expensesDates,
                datasets: [{
                    borderColor: "#dc3545",
                    fill: false,
                    label: (this.props.groupedBy === "week" || this.props.groupedBy === "month") ? this.translate('CHARTS_DAILY_EXPENSES') : this.translate('CHARTS_MONTHLY_EXPENSES'),
                    data: this.expensesValues,

                }]
            },
            options: {
                plugins: {
                    datalabels: {
                        formatter: function(value, context) {
                            return ``;
                        }
                    },
                    
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return CountryHelpers.getStringMasked(data['datasets'][0]['data'][tooltipItem['index']]);
                        },
                    }
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
    <div id="expensesLinesDiv">
        <canvas id="expensesLines" className="canvas"></canvas>
    </div>
}

export default ExpensesLines