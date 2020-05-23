import "./charts.css"
import React, { Component } from "react"

import Chart  from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

class IncomesLines extends Component{
    constructor(props){
        super(props)
        this.incomes = []
    }
    
    componentDidMount(){
        this.initChart()
    }

    componentDidUpdate(){
        this.initChart()
    }

    initChart(){
        this.incomes = this.props.incomes
        this.groupByDate()
        this.incomesDates = this.incomes.map((income)=>income.date)
        this.incomesValues = this.incomes.map((income)=>income.amount)
        this.renderChart()
    }    
    
    groupByDate = () => {
        let incomes = this.incomes
        let groupedIncomes = []
        incomes = this.sortDate(incomes)
        incomes.forEach((income, index, incomes)=>{
            let incomeGroup = {amount: 0}
            incomes.reduce((previous, after)=>{
                let checkSameDate = true
                if(this.getYear(income["transactionDate"]) !== this.getYear(after["transactionDate"])) checkSameDate = false
                if(this.getMonth(income["transactionDate"]) !== this.getMonth(after["transactionDate"])) checkSameDate = false
                if(checkSameDate){
                    let date = `${this.getMonth(after["transactionDate"])}/${this.getYear(after["transactionDate"])}`
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
    
    sortDate = incomes => incomes.sort((a, b) => a["incomeDate"] >= b["incomeDate"] ? 1 : -1)
    
    getYear = date => date.split("-")[0]
    
    getMonth = date => date.split("-")[1]

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
                    label: 'Monthly Incomes',
                    data: this.incomesValues,

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
    <div id="incomesLinesDiv">
        <canvas id="incomesLines" className="canvas"></canvas>
    </div>
}

export default IncomesLines