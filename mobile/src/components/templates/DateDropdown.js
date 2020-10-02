import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text, TextInput } from "react-native"

import Modal from 'react-native-modal'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInputMask } from 'react-native-masked-text'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faTimesCircle, faEnvelope, faUser, faCheck, faSave } from '@fortawesome/free-solid-svg-icons'

import { doMathOperationWithDate } from "../helpers/DateHelpers"
import { getUser } from '../helpers/StorageHelpers'
import { translate } from '../helpers/TranslationHelpers'
import { styles, colors } from "../../assets/Styles"
const { lightBlue, dark } = colors
const {
    bgWhite, textYellow, dateDropdownItem, dateDropdownView, textCenter, dateDropdownHeader, modalView, modalModal, formGroup, formLabel, formControl,
    formControlButtonRight, modalViewHeader, modalViewHeaderTitleView, modalViewHeaderTitle, p1, modalViewBody, buttonMinimalist, bgLightBlue, flexGrow1
} = styles
 
export default class DateDropdown extends Component{
    constructor(props){
        super(props)
        this.state = {
            isDateDatePickerVisible: false,
            dateFilterMode: "start",
            dateFilter: {
                start: "",
                end: "",
                type: ""
            },
            isCustomModalVisible: false,
            customModalStatus: "",
            user: {}
        }
    }
    
    handleDateChange = dateMode => {
        let {dateFilter} = this.state
        dateFilter.type = dateMode

        if(dateMode === "custom") {
            this.setState({isCustomModalVisible: true, dateFilter})
        } else {
            if(dateMode !== "all") dateFilter = this.getDateAccordingToType(dateFilter)
            this.props.navigation.setParams({dateFilter, dateFilterTypeHasChanged: true}) 
            this.props.handleCloseDateDropdown()
        }
    }

    getDateAccordingToType = (dateFilter) => {
        let endDate  = new Date().toISOString()
        let startDate
        if(dateFilter.type === "last_week") {
            startDate = doMathOperationWithDate("subtract", "days", 7)
        } else if(dateFilter.type === "last_month") {
            startDate = doMathOperationWithDate("subtract", "months", 1)
        } else if(dateFilter.type === "last_year") {
            startDate = doMathOperationWithDate("subtract", "years", 1)
        }
        
        dateFilter.start = startDate.toISOString()
        dateFilter.end = endDate

        return dateFilter
    }

    chooseCustomDate = () => {
        if(!this.checkDateEmptyFields()) return
        if(!this.checkDateFieldsAreValid()) return

        this.props.navigation.setParams({dateMode: "custom", dateFilter: this.state.dateFilter, dateFilterTypeHasChanged: true})
        this.setState({isCustomModalVisible: false})
        this.props.handleCloseDateDropdown()

    }

    checkDateEmptyFields = () => {
        let {dateFilter} = this.state
        let checkCanChooseCustomDate = true
        if(!dateFilter.start) checkCanChooseCustomDate = false
        if(!dateFilter.end) checkCanChooseCustomDate = false
        return checkCanChooseCustomDate
    }
    
    checkDateFieldsAreValid = () => {
        let {dateFilter} = this.state
        let errorMessage = ""

        let start = this.createNewDateFromFormattedString(dateFilter.start)
        let end = this.createNewDateFromFormattedString(dateFilter.end)


        if(start > end) errorMessage = translate("DATE_DROPDOWN_START_DATE_CANT_BE_HIGHER_THAN_END_DATE")
        if(+start === +end) errorMessage = translate("DATE_DROPDOWN_START_DATE_CANT_BE_EQUALS_TO_END_DATE")
        
        if(errorMessage) this.setState({customModalStatus: errorMessage})

        return errorMessage ? false : true
    }

    createNewDateFromFormattedString = (dateString) => {
        let day, month, year
        
        if(this.state.user.country === "brazil") {
            day = dateString.split("/")[0]
            month = dateString.split("/")[1]
            year = dateString.split("/")[2]
        } else {
            day = dateString.split("-")[1]
            month = dateString.split("-")[0]
            year = dateString.split("-")[2]
        }

        return new Date(year, month, day)
    }

    handleDateTimeChange = (type, selectedDate) => {
        let country = this.state.user.country

        let date = moment(new Date(selectedDate)).local().format(this.state.user.country === "brazil" ? "DD/MM/YYYY" : "MM-DD-YYYY")
        
        let {dateFilter} = this.state
        
        dateFilter[type] = date
        this.setState({dateFilter, isDateDatePickerVisible: false})

    }

    getUser = async () => {
        let user = await getUser()
        this.setState({user})
    }
    
    componentDidMount = () => {
        this.getUser()
        this.handleDateChange("last_year")

    }

    render = () => 
        <Fragment>
            {this.state.isCustomModalVisible &&
                <Modal isVisible={this.state.isCustomModalVisible} useNativeDriver={true} style={modalModal}>
                    <View style={[modalView, {height: 300}]}>
                        <View style={modalViewHeader}>
                            <View style={modalViewHeaderTitleView}>
                                <Text style={modalViewHeaderTitle}>{translate("DATE_DROPDOWN_CUSTOM_DATE")}</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={p1} onPress={()=>this.setState({isCustomModalVisible: false})}>
                                    <FontAwesomeIcon size={25} color={dark} icon={faTimesCircle} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={modalViewBody}>
                            {this.state.customModalStatus ? <Text style={[textCenter, textYellow]}>{this.state.customModalStatus}</Text> : false}
                            <View style={formGroup}>
                                <Text style={formLabel}>{translate("DATE_DROPDOWN_START_DATE")}</Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: this.state.user.country === "brazil" ? 'DD/MM/YYYY' : 'MM-DD-YYYY'
                                    }}
                                    style={formControl}
                                    placeholder={this.state.user.country === "brazil" ? 'DD/MM/YYYY' : 'MM-DD-YYYY'}
                                    value={this.state.dateFilter.start}
                                    onChangeText={text => this.setState({ dateFilter: {...this.state.dateFilter, start: text }  }) }
                                />
                                <TouchableOpacity style={formControlButtonRight} onPress={()=>this.setState({dateFilterMode: "start", isDateDatePickerVisible: true})}>
                                    <FontAwesomeIcon size={22} color={dark} icon={faCalendar} />
                                </TouchableOpacity>
                                
                            </View>

                            <View style={[formGroup]}>
                                <Text style={formLabel}>{translate("DATE_DROPDOWN_END_DATE")}</Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: this.state.user.country === "brazil" ? 'DD/MM/YYYY' : 'MM-DD-YYYY'
                                    }}
                                    style={formControl}
                                    placeholder={this.state.user.country === "brazil" ? 'DD/MM/YYYY' : 'MM-DD-YYYY'}
                                    value={this.state.dateFilter.end}
                                    onChangeText={text => this.setState({ dateFilter: {...this.state.dateFilter, end: text }  }) }
                                />
                                <TouchableOpacity style={formControlButtonRight} onPress={()=>this.setState({dateFilterMode: "end", isDateDatePickerVisible: true})}>
                                    <FontAwesomeIcon size={22} color={dark} icon={faCalendar} />
                                </TouchableOpacity>
                                
                            </View>

                            {this.state.isDateDatePickerVisible &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={ new Date()}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, selectedDate)=>this.handleDateTimeChange(this.state.dateFilterMode, selectedDate)}
                                /> 
                                
                            }

                            <View style={flexGrow1}></View>

                            <View style={[formGroup]}>
                                <TouchableOpacity 
                                    disabled={!this.checkDateEmptyFields()}  
                                    onPress={()=>this.chooseCustomDate()} 
                                    style={[ buttonMinimalist, bgLightBlue, {opacity: this.checkDateEmptyFields() ? 1 : 0.7}]}
                                >
                                    <FontAwesomeIcon icon={faSave} />
                                    <Text style={[formLabel]}> {translate("DATE_DROPDOWN_SAVE")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
            {this.props.isDateDropdownVisible &&
                <View>
                    <View style={[dateDropdownView]}>
                        <View style={dateDropdownHeader}>
                            <Text style={[textCenter]}>{translate("DATE_DROPDOWN_FILTER_BY_DATE")}</Text>
                        </View>
                        <View>
                            
                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("last_week")}>
                                <Text style={[textCenter]}>{translate("DATE_DROPDOWN_LAST_WEEK")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("last_month")}>
                                <Text style={[textCenter]}>{translate("DATE_DROPDOWN_LAST_MONTH")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("last_year")}>
                                <Text style={[textCenter]}>{translate("DATE_DROPDOWN_LAST_YEAR")}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("all")}>
                                <Text style={[textCenter]}>{translate("DATE_DROPDOWN_ALL_ENTRIES")}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("custom")}>
                                <Text style={[textCenter]}>{translate("DATE_DROPDOWN_CUSTOM_DATE")}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            }

        </Fragment>
            
}