import {StyleSheet, Dimensions, Platform} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
  halfWidth: Dimensions.get('window').width / 2,
}
  
export const colors  = {
  red: "#D33F49",
  black: "#201E1F",
  yellow: "#FFC857",
  lightBlue: "#21CEBA",
  lightGreen: "#6BEEAA",
  lightGrey: "#F4F4F8",
}

export const spacing = {
  sSm: 10,
  sMd: 20,
  sLg: 30,
  sXl: 40
}

export const fonts = {
  fSm: 12,
  fMd: 18,
  fLg: 28,
  fPrimary: Platform.OS === 'ios' ? "Arial" : "Roboto-Regular"
}

export const styles = StyleSheet.create({
  /* COMPONENTS */
  pAbsolute: { position: "absolute" },
  b0: { bottom: 0 },
  r0: { right: 0 },
  textCenter: { textAlign: "center" },
  textBlack: { color: colors.black },
  borderRounded: {
    borderWidth: 0,
    borderRadius: 100,
  },
  h1: {
    fontSize: fonts.fLg,
    fontFamily: colors.primary,
  },
  
  h2: {
    fontSize: fonts.fMd,
    fontFamily: fonts.fPrimary,
  },
  /* AUTHENTICATION */
  signUpContainer: {
    flexGrow: 1,
    alignItems: "center", 
    backgroundColor: colors.lightGray,
  },
  
  signUpContainer: {
    flexGrow: 1,
    alignItems: "center", 
    backgroundColor: colors.lightGrey,
    paddingVertical: spacing.sMd
  }
})
  
