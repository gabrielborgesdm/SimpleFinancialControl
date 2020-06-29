import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import CountryHelpers from "../helpers/CountryHelpers"

import DateHelpers from "../helpers/DateHelpers"

class TransactionsLines extends Component{
    constructor(props){
        super(props)
        this.transactions = this.props.transactions
        this.transactionsDates = []
        this.expenses = []
        this.incomes = []
        this.translate = this.props.translate

    }
    
    componentDidMount(){
        this.transactions = this.props.transactions
        this.transactionsDates = []
        this.expenses = []
        this.incomes = []
        this.initChart()
    }

    componentDidUpdate(){
        this.transactions = this.props.transactions
        this.transactionsDates = []
        this.expenses = []
        this.incomes = []
        this.initChart()
    }

    initChart(){

        if(this.props.groupedBy === "week" || this.props.groupedBy === "month") {
            this.groupByDay()
        } else {
            this.groupByMonth()
        }
        
        this.expenses = this.expenses.map((expense)=>expense.amount)
        this.incomes = this.incomes.map((income)=>income.amount)

        this.renderChart()
    }
    
    groupByDay = () => {
        let { transactions } = this
        transactions = this.sortDate(transactions)
        let groupedIncomes = []
        let groupedExpenses = []

        
        transactions.forEach((transaction, index, transactions)=>{
            let incomesGroup = {amount: 0}
            let expensesGroup = {amount: 0}

            transactions.reduce((previous, after)=>{
                let checkSameDate = true
                if(DateHelpers.getDay(transaction["transactionDate"]) !== DateHelpers.getDay(after["transactionDate"])) checkSameDate = false
                if(checkSameDate){
                    let date = DateHelpers.getDayAndMonth(after["transactionDate"])
                    after["amount"] > 0 ? incomesGroup.amount += after["amount"] : expensesGroup.amount += after["amount"] * -1
                    incomesGroup.date = date
                    expensesGroup.date = date
                    this.transactionsDates.push(date)
                }
                return after
            }, {})
            
            groupedIncomes.push(incomesGroup)
            groupedExpenses.push(expensesGroup)
        })
        this.transactionsDates = [...new Set(this.transactionsDates)]
        groupedIncomes = this.removeDuplicatedGroupedTransactions(groupedIncomes)
        groupedExpenses = this.removeDuplicatedGroupedTransactions(groupedExpenses)
        this.incomes = groupedIncomes
        this.expenses = groupedExpenses
    }
    
    groupByMonth = () => {
        let { transactions } = this
        transactions = this.sortDate(transactions)
        let groupedIncomes = []
        let groupedExpenses = []

        
        transactions.forEach((transaction, index, transactions)=>{
            let incomesGroup = {amount: 0}
            let expensesGroup = {amount: 0}

            transactions.reduce((previous, after)=>{
                let checkSameDate = true
                if(DateHelpers.getYear(transaction["transactionDate"]) !== DateHelpers.getYear(after["transactionDate"])) checkSameDate = false
                if(DateHelpers.getMonth(transaction["transactionDate"]) !== DateHelpers.getMonth(after["transactionDate"])) checkSameDate = false
                
                if(checkSameDate){
                    let date = DateHelpers.getMonthAndYear(after["transactionDate"])
                    after["amount"] > 0 ? incomesGroup.amount += after["amount"] : expensesGroup.amount += after["amount"] * -1
                    incomesGroup.date = date
                    expensesGroup.date = date
                    this.transactionsDates.push(date)
                }
                return after
            }, {})
            
            groupedIncomes.push(incomesGroup)
            groupedExpenses.push(expensesGroup)
        })
        this.transactionsDates = [...new Set(this.transactionsDates)]
        groupedIncomes = this.removeDuplicatedGroupedTransactions(groupedIncomes)
        groupedExpenses = this.removeDuplicatedGroupedTransactions(groupedExpenses)
        this.incomes = groupedIncomes
        this.expenses = groupedExpenses
    }
    
    sortDate = transactions => transactions.sort((a, b) => a["transactionDate"] >= b["transactionDate"] ? 1 : -1)

    removeDuplicatedGroupedTransactions = groupedTransactions => {
        groupedTransactions = groupedTransactions.map((transaction=>JSON.stringify(transaction)))
        let withoutDuplicate = [...new Set(groupedTransactions)]
        groupedTransactions = withoutDuplicate.map((transaction)=>JSON.parse(transaction))
        return groupedTransactions
    }
    
    renderChart = () => {
        let transactionsLinesDiv = document.querySelector("#transactionsLinesDiv")
        transactionsLinesDiv.innerHTML = ""
        transactionsLinesDiv.innerHTML = `<canvas id="transactionsLines" className="canvas"></canvas>`
        let ctx = document.getElementById('transactionsLines').getContext('2d')
        new Chart(ctx, {
            type: 'line',
            plugins: [ChartDataLabels],
            data: {
                labels: this.transactionsDates,
                datasets: [{
                    borderColor: "#107e7d",
                    fill: false,
                    label: (this.props.groupedBy === "week" || this.props.groupedBy === "month") ? this.translate('CHARTS_DAILY_INCOMES') : this.translate('CHARTS_MONTHLY_INCOMES'),
                    data: this.incomes,

                },
                {
                    borderColor: "#dc3545",
                    fill: false,
                    label: (this.props.groupedBy === "week" || this.props.groupedBy === "month") ? this.translate('CHARTS_DAILY_EXPENSES') : this.translate('CHARTS_MONTHLY_EXPENSES'),
                    data: this.expenses,

                }]
            },
            options: {
                plugins: {
                    datalabels: {
                       
                        formatter: function(value, context) {
                            return ``;
                        }
                    }
                    
                    
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return CountryHelpers.getStringMasked(tooltipItem.value);
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
    <div id="transactionsLinesDiv">
        <canvas id="transactionsLines" className="canvas"></canvas>
    </div>
}

export default TransactionsLines