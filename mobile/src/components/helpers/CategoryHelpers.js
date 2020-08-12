import {  faListAlt, faUtensilSpoon, faShoppingBag, faHome, faBus, faCar, faTv, faLaptop, faPencilRuler, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { translate } from "./TranslationHelpers"
export const getCategory = (key) => {
    let category, icon
    switch(key){
        case "food": 
            category = translate('CHARTS_CATEGORY_FOOD')
            icon = faUtensilSpoon
            break
        case "shopping": 
            category = translate('CHARTS_CATEGORY_SHOPPING')
            icon = faShoppingBag
            break
        case "housing": 
            category = translate('CHARTS_CATEGORY_HOUSING')
            icon = faHome
            break
        case "transportation": 
            category = translate('CHARTS_CATEGORY_TRANSPORTATION')
            icon = faBus
            break
        case "vehicle": 
            category = translate('CHARTS_CATEGORY_VEHICLE')
            icon = faCar
            break
        case "entertainment": 
            category = translate('CHARTS_CATEGORY_ENTERTAINMENT')
            icon = faTv
            break
        case "technology": 
            category = translate('CHARTS_CATEGORY_TECHNOLOGY')
            icon = faLaptop
            break
        case "education": 
            category = translate('CHARTS_CATEGORY_EDUCATION')
            icon = faPencilRuler
            break
        case "investments": 
            category = translate('CHARTS_CATEGORY_INVESTMENTS')
            icon = faChartBar
            break
        case "expenses": 
            category = translate('CHARTS_CATEGORY_EXPENSES')
            icon = faDollarSign
            break
        case "work": 
            category = translate('CHARTS_CATEGORY_WORK')
            icon = faBriefcase
            break
        default: 
            category = translate('CHARTS_CATEGORY_OTHERS')
            icon = faListAlt
            break
    }
    return {category, icon}
}