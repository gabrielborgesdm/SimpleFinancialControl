import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import DateHelpers from "../helpers/DateHelpers"

import CountryHelpers from "../helpers/CountryHelpers"

class IncomesLines extends Component{
    constructor(props){
        super(props)
        this.incomes = []
        this.translate = this.props.translate
    }
    
    componentDidMount(){
        this.initChart()
    }

    componentDidUpdate(){
        this.initChart()
    }

    initChart(){
        this.incomes = this.props.incomes
        
        if(this.props.groupedBy === "week" || this.props.groupedBy === "month") {
            this.groupByDay()
        } else {
            this.groupByMonth()
        }

        this.incomesDates = this.incomes.map((income)=>income.date)
        this.incomesValues = this.incomes.map((income)=>income.amount)
        this.renderChart()
    }    
    groupByDay = () => {
        let incomes = this.incomes
        let groupedIncomes = []
        incomes = this.sortDate(incomes)
        incomes.forEach((income, index, incomes)=>{
            let incomeGroup = {amount: 0}
            incomes.reduce((previous, after)=>{
                let checkSameDate = true
                if(DateHelpers.getDay(income["transactionDate"]) !== DateHelpers.getDay(after["transactionDate"])) checkSameDate = false
                if(checkSameDate){
                    let date = DateHelpers.getDayAndMonth(after["transactionDate"])
                    let amount = incomeGroup.amount + after["amount"]
                    incomeGroup = {date, amount}
                }
                return after
            }, {})
            groupedIncomes.push(incomeGroup)
        })
        groupedIncomes = this.removeDuplicatedGroupedIncomes(groupedIncomes)
        this.incomes = groupedIncomes
    }
    
    groupByMonth = () => {
        let incomes = this.incomes
        let groupedIncomes = []
        incomes = this.sortDate(incomes)
        incomes.forEach((income, index, incomes)=>{
            let incomeGroup = {amount: 0}
            incomes.reduce((previous, after)=>{
                let checkSameDate = true
                if(DateHelpers.getYear(income["transactionDate"]) !== DateHelpers.getYear(after["transactionDate"])) checkSameDate = false
                if(DateHelpers.getMonth(income["transactionDate"]) !== DateHelpers.getMonth(after["transactionDate"])) checkSameDate = false
                if(checkSameDate){
                    let date = DateHelpers.getMonthAndYear(after["transactionDate"])
                    let amount = incomeGroup.amount + after["amount"]
                    incomeGroup = {date, amount}
                }
                return after
            }, {})
            groupedIncomes.push(incomeGroup)
        })
        groupedIncomes = this.removeDuplicatedGroupedIncomes(groupedIncomes)
        this.incomes = groupedIncomes
    }
    
    sortDate = incomes => incomes.sort((a, b) => new Date(a["transactionDate"]) >= new Date(b["transactionDate"]) ? 1 : -1)
    
    removeDuplicatedGroupedIncomes = groupedIncomes => {
        groupedIncomes = groupedIncomes.map((income=>JSON.stringify(income)))
        let withoutDuplicate = [...new Set(groupedIncomes)]
        groupedIncomes = withoutDuplicate.map((income)=>JSON.parse(income))
        return groupedIncomes
    }
    
    renderChart = () => {
        let incomesLinesDiv = document.querySelector("#incomesLinesDiv")
        incomesLinesDiv.innerHTML = ""
        incomesLinesDiv.innerHTML = `<canvas id="incomesLines" className="canvas"></canvas>`

        let ctx = document.getElementById('incomesLines').getContext('2d')
        new Chart(ctx, {
            type: 'line',
            plugins: [ChartDataLabels],
            data: {
                labels: this.incomesDates,
                datasets: [{
                    borderColor: "#107e7d",
                    fill: false,
                    label: this.translate('CHARTS_MONTLY_INCOMES'),
                    data: this.incomesValues,

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
    <div id="incomesLinesDiv">
        <canvas id="incomesLines" className="canvas"></canvas>
    </div>
}

export default IncomesLines