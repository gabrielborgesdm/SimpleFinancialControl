import { translate } from '../helpers/TranslationHelpers'

const executeOperation = (number, operation, amount) => {
    let result 
    switch(operation){
        case "add":
            result = number + amount
            break
        case "subtract":
            result = number - amount
            break
    }

    return result
}

export const doMathOperationWithDate = (operationType, unitOfTime, amount, dateString = null) => {
    let date = dateString ? new Date(dateString) : new Date()

    let year = unitOfTime === "years" ? executeOperation(date.getFullYear(), operationType, amount) : date.getFullYear() 
    let month = unitOfTime === "months" ? executeOperation(date.getMonth(), operationType, amount) : date.getMonth() 
    let day = unitOfTime === "days" ? executeOperation(date.getDate(), operationType, amount) : date.getDate() 
    let hours = unitOfTime === "hours" ? executeOperation(date.getHours(), operationType, amount) : date.getHours() 
    let minutes = unitOfTime === "minutes" ? executeOperation(date.getMinutes(), operationType, amount) : date.getMinutes()
    let seconds = unitOfTime === "minutes" ? executeOperation(date.getSeconds(), operationType, amount) : date.getSeconds()
    let milliseconds = unitOfTime === "milliseconds" ? executeOperation(date.getMilliseconds(), operationType, amount) : date.getMilliseconds()


    let newDate = new Date(year, month, day, hours, minutes, seconds, milliseconds)
    return newDate
}


export const getFormattedDateType = (dateType) => {
    let message = ""
    if(dateType === "last_week") message = translate("DATE_DROPDOWN_LAST_WEEK") 
    if(dateType === "last_month") message = translate("DATE_DROPDOWN_LAST_MONTH") 
    if(dateType === "last_year") message = translate("DATE_DROPDOWN_LAST_YEAR") 
    if(dateType === "all") message = translate("DATE_DROPDOWN_ALL_ENTRIES") 
    if(dateType === "custom") message = translate("DATE_DROPDOWN_CUSTOM_DATE") 
    return message
}