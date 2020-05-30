import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import CountryHelpers from "../helpers/CountryHelpers"

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
        this.groupByDate()
        this.expenses = this.expenses.map((expense)=>expense.amount)
        this.incomes = this.incomes.map((income)=>income.amount)

        this.renderChart()
    }
    
    groupByDate = () => {
        let { transactions } = this
        transactions = this.sortDate(transactions)
        let groupedIncomes = []
        let groupedExpenses = []

        
        transactions.forEach((transaction, index, transactions)=>{
            let incomesGroup = {amount: 0}
            let expensesGroup = {amount: 0}

            transactions.reduce((previous, after)=>{
                let checkSameDate = true
                if(this.getYear(transaction["transactionDate"]) !== this.getYear(after["transactionDate"])) checkSameDate = false
                if(this.getMonth(transaction["transactionDate"]) !== this.getMonth(after["transactionDate"])) checkSameDate = false
                if(checkSameDate){
                    let date = `${this.getMonth(after["transactionDate"])}/${this.getYear(after["transactionDate"])}`
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
    
    getYear = date => date.split("-")[0]
    
    getMonth = date => date.split("-")[1]

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
                    label: this.translate('CHARTS_MONTLY_INCOMES'),
                    data: this.incomes,

                },
                {
                    borderColor: "#dc3545",
                    fill: false,
                    label: this.translate('CHARTS_MONTLY_EXPENSES'),
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
    <div id="transactionsLinesDiv">
        <canvas id="transactionsLines" className="canvas"></canvas>
    </div>
}

export default TransactionsLines