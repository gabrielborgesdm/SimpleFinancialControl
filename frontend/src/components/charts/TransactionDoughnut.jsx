import React, { Component } from "react"
import Chart from 'chart.js'


class TransactionsDoughnut extends Component{
   
    constructor(props){
        super(props)
        this.state = {
            transactions: this.props.transactions,
            categoryColor: [
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
    }
    loadCharts(){
        let categories = {
            'food': 0,
            'shopping': 0,
            'housing': 0,
            'transportation': 0,
            'vehicle': 0,
            'entertainment': 0,
            'technology': 0,
            'education': 0,
            'investments': 0,
            'expenses': 0,
            'others': 0,
        }
        this.props.transactions.forEach((transaction)=>{
            if(transaction.amount < 0) categories[transaction["category"]] += transaction.amount * -1
        })

        categories = Object.entries(categories).filter(([key, value])=>value !== 0)
        let categoryLabel = []
        let categoryData = []
        
        categories.forEach(([key, value])=>{
            categoryLabel.push(key)
            categoryData.push(value)
            
        })

        const ctx = document.getElementById('categories')
        new Chart(ctx, {
            type: 'doughnut',
            data : {
                datasets: [{
                    data: categoryData,
                    backgroundColor: this.state.categoryColor,
                }],
                labels: categoryLabel,
                options: {
                    events: false,
                    tooltips: {
                        enabled: false
                    },
                    hover: {
                        animationDuration: 0
                    },
                    animation: {
                        duration: 1,
                        onComplete: function () {
                            var chartInstance = this.chart,
                                ctx = chartInstance.ctx;
                            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                
                            this.data.datasets.forEach(function (dataset, i) {
                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function (bar, index) {
                                    var data = dataset.data[index];                            
                                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                });
                            });
                        }
                    }
                }
            }
        })
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.transactions !== this.props.transactions) {
            this.loadCharts()
        }
        
    }
    render(){
        return (
            <div className="row">
                <div className="col-12 col-sm-6 d-flex align-items-center">
                    <h1 className="mx-auto text-dark-green align-middle">Expenses Categories</h1>
                </div>
                <canvas id="categories" className="col-12 col-sm-6 align-items-center"></canvas>
            </div>
            
        )
    }  
}

export default TransactionsDoughnut