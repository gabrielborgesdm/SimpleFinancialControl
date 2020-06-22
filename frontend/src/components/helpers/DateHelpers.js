import translate from "../helpers/Translation"

export default class DateHelpers{

    static getMonthAndYear = (date) => {
        date = new Date(date).toISOString()
        date = date.split("-")
        if(DateHelpers.getLanguageByBrowserLanguage() === "pt-BR"){
            date = `${DateHelpers.getMonthNameByItsNumber(date[1])}/${date[0].substring(2)}`
        } else {
            date = `${DateHelpers.getMonthNameByItsNumber(date[1])}-${date[0].substring(2)}`
        }        
        return date
    }

    static getDayAndMonth = (date) => {
        date = new Date(date).toISOString()
        date = date.split("T")[0]
        date = date.split("-")
        if(DateHelpers.getLanguageByBrowserLanguage() === "pt-BR"){
            date = `${date[2]}/${DateHelpers.getMonthNameByItsNumber(date[1])}`
        } else {
            date = `${DateHelpers.getMonthNameByItsNumber(date[1])}-${date[2]}`
        }
        return date
    }

    static getLanguageByBrowserLanguage = () => {
        let language
        language =  window.navigator.userLanguage || window.navigator.language
        if(language !== "pt-BR" && language !== "en-US") language = "en-US"
        return language
    }

    static getYear = date => date.split("-")[0]
    
    static getMonth = date => date.split("-")[1]

    static getDay = date => date.split("-")[2]

    static getMonthNameByItsNumber = (monthNumber) => {
        let monthName
        monthNumber = parseInt(monthNumber)
        switch (monthNumber){
            case 1:
                monthName = translate("MONTH_SHORT_JAN")
                break
            case 2:
                monthName = translate("MONTH_SHORT_FEB")
                break
            case 3:
                monthName = translate("MONTH_SHORT_MAR")
                break
            case 4:
                monthName = translate("MONTH_SHORT_APR")
                break
            case 5:
                monthName = translate("MONTH_SHORT_MAY")
                break
            case 6:
                monthName = translate("MONTH_SHORT_JUN")
                break
            case 7:
                monthName = translate("MONTH_SHORT_JUL")
                break
            case 8:
                monthName = translate("MONTH_SHORT_AUG")
                break
            case 9:
                monthName = translate("MONTH_SHORT_SEP")
                break
            case 10:
                monthName = translate("MONTH_SHORT_OCT")
                break
            case 11:
                monthName = translate("MONTH_SHORT_NOV")
                break
            case 12:
                monthName = translate("MONTH_SHORT_DEC")
                break
            default:
                monthName = null
                break
        }
        return monthName
    }

}
