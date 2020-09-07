import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text, TextInput } from "react-native"

import Modal from 'react-native-modal'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInputMask } from 'react-native-masked-text'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faTimesCircle, faEnvelope, faUser, faCheck } from '@fortawesome/free-solid-svg-icons'

import { getUser } from '../helpers/StorageHelpers'
import { translate } from '../helpers/TranslationHelpers'
import { styles, colors } from "../../assets/Styles"
const { lightBlue, dark } = colors
const {
    bgWhite, flexRow, dateDropdownItem, dateDropdownView, textCenter, dateDropdownHeader, modalView, modalModal, formGroup, formLabel, formControl, formControlButtonRight,
    minimalistInputGroup, modalViewHeader, modalViewHeaderTitleView, modalViewHeaderTitle, p1, modalViewBody, buttonMinimalist, bgLightGreen, opacityLow, opacityHigh, flexGrow1
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
            },
            dateFilterEnd: "",
            isCustomModalVisible: false,
            user: {}
        }
    }
    
    handleDateChange = dateMode => {
        console.log("test", dateMode)
        if(dateMode === "custom") {
            this.setState({isCustomModalVisible: true})
        } else {
            /* let getDateFilterStart = this.getDateFilterStart(mode)
            this.props.navigation.setParams({date: dateMode}) */
            
            this.props.handleCloseDateDropdown()
        }


    }

    chooseCustomDate = () => {
        this.setState({isCustomModalVisible: false})
        this.props.navigation.setParams({dateMode: "custom", dateFilter: this.state.dateFilter})
    }

    handleDateTimeChange = (type, selectedDate) => {
        let country = this.state.user.country

        let date = moment(new Date(selectedDate)).local().format(this.state.user.country === "brazil" ? "DD/MM/YYYY" : "MM-DD-YYYY")
        
        let {dateFilter} = this.state
        
        dateFilter[type] = date
        this.setState({dateFilter, isDateDatePickerVisible: false})

        
    }

    getDateFilterStart = () => {
        
    }

    getUser = async () => {
        let user = await getUser()
        console.log(user)
        this.setState({user})
    }
    
    componentDidMount = () => {
        this.getUser()
    }

    render = () => 
        <Fragment>
            {this.state.isCustomModalVisible &&
                <Modal isVisible={this.state.isCustomModalVisible} useNativeDriver={true} style={modalModal}>
                    <View style={[modalView, {height: 280}]}>
                        <View style={modalViewHeader}>
                            <View style={modalViewHeaderTitleView}>
                                <Text style={modalViewHeaderTitle}>Custom Date</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={p1} onPress={()=>this.setState({isCustomModalVisible: false})}>
                                    <FontAwesomeIcon size={25} color={dark} icon={faTimesCircle} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={modalViewBody}>
                            <View style={formGroup}>
                                <Text style={formLabel}>Enter the custom start date</Text>
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
                                <Text style={formLabel}>Enter the custom end date</Text>
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
                                <TouchableOpacity disabled={this.state.dateFilter.start && this.state.dateFilter.end ? true : false} onPress={()=>this.chooseCustomDate()} style={[ buttonMinimalist, bgLightGreen]}>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <Text style={[formLabel]}>  Choose Custom Date</Text>
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
                            <Text style={[textCenter]}>Filtrar por Data</Text>
                        </View>
                        <View>
                            
                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("last_month")}>
                                <Text style={[textCenter]}>Último Mês</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("last_year")}>
                                <Text style={[textCenter]}>Últimos 12 meses</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("custom")}>
                                <Text style={[textCenter]}>Customizado</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[dateDropdownItem]} onPress={()=>this.handleDateChange("all")}>
                                <Text style={[textCenter]}>Todas Transações</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            }

        </Fragment>
            
}