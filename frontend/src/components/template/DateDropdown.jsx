import "./DateDropdown.css"
import React, {Component} from "react"
import  $ from 'jquery'
import 'popper.js'

export default class DateDropdown extends Component{
    constructor(props){
        super(props)
        this.state = {
            startDate: "",
            endDate: "",
            customStartDate: "",
            customEndDate: this.parseDate(new Date()),
            firstLoad: true
        }
        this.translate = this.props.translate
    }
    
    componentDidUpdate(prevProps){
        if(!this.props.dontFirstLoad){
            if (prevProps.transactions !== this.props.transactions && this.state.firstLoad) {
                this.handleDateClick("year")
                this.setState({firstLoad: false})
            }
        }
    }
    toogleModal = () => {
        $("#modal-custom-date").modal('toggle')

    }

    handleDateClick = (dateString) => {
        let endDate = new Date()
        let day = endDate.getDate()
        let month = endDate.getMonth()
        let year = endDate.getFullYear()
        let dateFilterChoosen
        let filterValue = ""
        switch(dateString){
            case "week":
                day -=7
                dateFilterChoosen = this.translate('DATE_DROPDOWN_LAST_WEEK')
                filterValue = "week"
                break
            case "month":
                month -= 1
                dateFilterChoosen = this.translate('DATE_DROPDOWN_LAST_MONTH')
                filterValue = "month"
                break
            case "year":
                year -= 1
                dateFilterChoosen = this.translate('DATE_DROPDOWN_LAST_YEAR')
                filterValue = "year"
                break
            case "custom":
                this.toogleModal()
                filterValue = "custom"
            break
            default: 
                this.setState({startDate: "", endDate: ""})
                break
        }

        if(dateString !== "custom" && dateString !== "all") {
            let startDate = new Date(year, month, day)
            this.setState({startDate: this.parseDate(startDate), endDate: this.parseDate(endDate)}, ()=> {
                this.setState({dateFilterChoosen})
                this.props.selectDateFilter(this.state.startDate, this.state.endDate, filterValue)
            })
        } else if(dateString === "all"){
            this.setState({dateFilterChoosen: this.translate('DATE_DROPDOWN_ALL_ENTRIES')})
            this.props.selectDateFilter(null, null, "all")
        }
    }

    parseDate = (date) => date.toISOString().split('T')[0] 

    handleCustomDateChange = () => {
        let {customStartDate, customEndDate} = this.state
        if(customStartDate && customEndDate){
            customStartDate = this.parseDate(new Date(customStartDate))
            customEndDate = this.parseDate(new Date(customEndDate))
            let dateFilterChoosen = `${customStartDate} / ${customEndDate}`
            this.props.selectDateFilter(customStartDate, customEndDate, "custom")
            this.setState({dateFilterChoosen})
            this.toogleModal()
        }
    }

    render = () =>
    <React.Fragment>
        <div className="dropdown align-self-center">
            {!this.props.onlyIcon && <span className="text-dark-green">{this.state.dateFilterChoosen}</span>}
            
            <button className="btn btn-default text-dark-green dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-calendar"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-right py-0" aria-labelledby="dropdownMenuButton">
                <li><h3 className="dropdown-header">{this.translate('DATE_DROPDOWN_FILTER_BY_DATE')}</h3></li>
                <div className="dropdown-divider"></div>
                <li className="dropdown-item cursor-pointer" onClick={e=>this.handleDateClick("week")} >{this.translate('DATE_DROPDOWN_LAST_WEEK')}</li>
                <li className="dropdown-item cursor-pointer" onClick={e=>this.handleDateClick("month")} >{this.translate('DATE_DROPDOWN_LAST_MONTH')}</li>
                <li className="dropdown-item cursor-pointer" onClick={e=>this.handleDateClick("year")} >{this.translate('DATE_DROPDOWN_LAST_YEAR')}</li>
                <div className="dropdown-divider"></div>
                <li className="dropdown-item cursor-pointer" onClick={e=>this.handleDateClick("custom")}>{this.translate('DATE_DROPDOWN_CUSTOM_DATE')}</li>
                <li className="dropdown-item cursor-pointer" onClick={e=>this.handleDateClick("all")}>{this.translate('DATE_DROPDOWN_ALL_ENTRIES')}</li>
            </ul>
        </div>

        <div className="modal" id="modal-custom-date" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark-blue text-light">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.translate('DATE_DROPDOWN_CUSTOM_DATE')}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i className="fa fa-close text-light"></i></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                            <div className="form-group row">
                                <label htmlFor="startDate" className="col-sm-2 col-form-label">{this.translate('DATE_DROPDOWN_START_DATE')}</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="startDate" 
                                        onChange = {(e)=>this.setState({customStartDate: e.target.value})}
                                        defaultValue={this.state.customStartDate}
                                    />
                                    <small className="text-warning">{this.state.customStartDate === "" ? this.translate('DATE_DROPDOWN_START_DATE_CANT_BE_EMPTY') : " "}</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="endDate" className="col-sm-2 col-form-label">{this.translate('DATE_DROPDOWN_END_DATE')}</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="endDate" 
                                        onChange = {(e)=>this.setState({customEndDate: e.target.value})}
                                        defaultValue={this.state.customEndDate}
                                    />
                                    <small className="text-warning">{this.state.customEndDate === "" ? this.translate('DATE_DROPDOWN_END_DATE_CANT_BE_EMPTY') : " "}</small>
                                </div>
                            </div>
                          
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-light-red" data-dismiss="modal"><i className="fa fa-close"></i> {this.translate('DATE_DROPDOWN_CLOSE')}</button>
                        <button 
                            type="button"
                            className="btn btn-outline-dark-green" 
                            disabled={this.state.customStartDate === "" || this.state.customEndDate === "" ? "disabled" : "" }
                            onClick={e=>this.handleCustomDateChange()}>
                            <i className="fa fa-save"></i> {this.translate('DATE_DROPDOWN_SAVE')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
        
}
