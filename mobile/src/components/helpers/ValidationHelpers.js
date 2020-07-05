import { translate } from "./TranslationHelpers"


export const validateEmail  = (value) => {
  if(value){
    let regexEmailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if(regexEmailValidation.test(value)){
      return buildResponse(true)
    } else {
      return buildResponse(false, translate('FORM_INSERT_A_VALID_EMAIL'))
    }
  } else {
    return buildResponse(false, translate('FORM_INSERT_AN_EMAIL'))
  }
}

export const validatePassword  = (value) => {
  if(checkPasswordSecurityLevel(value) >= 2){
    return buildResponse(true)
  } else {
    return buildResponse(false, translate('FORM_PASSWORD_IS_INSECURE'))
  }
}

export const validateRepeatedPassword  = (password, repeatedPassword) => {
  if(password !== repeatedPassword) {
    return buildResponse(false, translate('FORM_PASSWORD_MUST_BE_THE_SAME'))
  } else {
    return buildResponse(true)
  }
}

export const checkPasswordSecurityLevel = (password) => {
  let securityLevel = 0
  password = String(password)
  if(password.length > 5) {
      if(password.match(/\d+/g)) securityLevel ++
      if(password.match(/[`!@#$%^&*()_+\-={};':"\\|,.<>?~]/)) securityLevel ++
      if(password.match(/[abcdefghijklmnopqrstuvwxyz]/)) securityLevel ++
      if(password.match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/)) securityLevel ++
  }
  return securityLevel
}

const buildResponse = (status, ...messages) => {
  if(!messages) messages = []
  return {
    status: status,
    messages: messages.map(message=> message)
  }
}

const pushErrors = (response, ...messages) => {
  response["messages"] = [...response.messages, ...messages.map(message=> message)]
  return response
}