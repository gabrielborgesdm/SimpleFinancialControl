import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

class TransactionsBars extends Component{
    constructor(props){
        super(props)
        this.transactions = []
        this.transactionsDates = []
        this.expenses = []
        this.incomes = []
    }
    
    componentDidMount(){
        this.initChart()
    }

    initChart(){
        this.groupByDate()
        this.expenses = this.expenses.map((expense)=>expense.amount)
        this.incomes = this.incomes.map((income)=>income.amount)

        this.renderChart()
    }
    
    groupByDate = () => {
        let transactions = this.props.transactions
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
        console.log(this.transactionsDates, this.expenses, this.incomes)
        let ctx = document.getElementById('transactionsBars').getContext('2d')
        new Chart(ctx, {
            type: 'bar',
            plugins: [ChartDataLabels],
            data: {
                labels: this.transactionsDates,
                datasets: [{
                    backgroundColor: "#107e7d",
                    label: 'Incomes',
                    data: this.incomes,

                },
                {
                    backgroundColor: "#dc3545",
                    label: 'Expenses',
                    data: this.expenses,

                }]
            },
            options: {
                plugins: {
                    datalabels: {
                        color: "#fff",
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
    <canvas id="transactionsBars"></canvas>
}

export default TransactionsBars