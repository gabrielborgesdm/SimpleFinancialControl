import {StyleSheet} from 'react-native'
import {dimensions, components, colors, spacing, fonts } from "./Components" 
export {dimensions, colors, spacing, fonts } 

  
export const styles = StyleSheet.create({...components, ...{
  /* AUTHENTICATION */
  signUpContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  minimalistInputGroup: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 30,
  },
  minimalistInputControl: {
    flexGrow: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingLeft: 25,
    borderColor: colors.lightGrey,
    
  },

  minimalistInputIcon: {
    position: "absolute",
    bottom: 18,
    color: colors.darkGrey
  },
  
  buttonGradient: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 3
    
  },
  lightGreyLogoView: {
    alignSelf: "center",
    justifyContent: "center",
    height: dimensions.quarterWidth + 50,
    width: dimensions.quarterWidth + 50,
    ...components.mtLg,
    borderRadius: 200,
    backgroundColor: colors.lightGrey,
    borderColor: colors.lightGrey,

  },
  lightGreyLogoImage: {
    width: dimensions.quarterWidth,
    height: dimensions.quarterWidth,
    resizeMode: "contain",
    alignSelf: "center"
  }


}})
  