import {Platform, Dimensions} from 'react-native' 

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width,
    halfWidth: Dimensions.get('window').width / 2,
    quarterWidth: Dimensions.get('window').width / 4,
}
    
export const colors  = {
    red: "#D33F49",
    black: "#201E1F",
    yellow: "#FFC857",
    lightBlue: "#21CEBA",
    lightGreen: "#6BEEAA",
    lightGrey: "#F4F4F8",
    darkGrey: "#47484a",
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
    fPrimary: Platform.OS === 'ios' ? "Arial" : "Verdana"
}

export const components = {
    positionAbsolute: { position: "absolute" },

    flex1: { flex: 1 },

    bottom0: { bottom: 0 },
    right0: { right: 0 },
    left0: { left: 0 },
    top0: { top: 0 },

    mxSm: { marginHorizontal: spacing.sSm },
    mxMd: { marginHorizontal: spacing.sMd },
    mxLg: { marginHorizontal: spacing.sLg },
    mxXl: { marginHorizontal: spacing.sXl },
    
    mySm: { marginVertical: spacing.sSm },
    myMd: { marginVertical: spacing.sMd },
    myLg: { marginVertical: spacing.sLg },
    myXl: { marginVertical: spacing.sXl },

    mtSm: { marginTop: spacing.sSm },
    mtMd: { marginTop: spacing.sMd },
    mtLg: { marginTop: spacing.sLg },
    mtXl: { marginTop: spacing.sXl },
    
    mrSm: { marginRight: spacing.sSm },
    mrMd: { marginRight: spacing.sMd },
    mrLg: { marginRight: spacing.sLg },
    mrXl: { marginRight: spacing.sXl },
    
    mbSm: { marginBottom: spacing.sSm },
    mbMd: { marginBottom: spacing.sMd },
    mbLg: { marginBottom: spacing.sLg },
    mbXl: { marginBottom: spacing.sXl },
    
    mlSm: { marginLeft: spacing.sSm },
    mlMd: { marginLeft: spacing.sMd },
    mlLg: { marginLeft: spacing.sLg },
    mlXl: { marginLeft: spacing.sXl },
    
    textLeft: { textAlign: "left" },
    textCenter: { textAlign: "center" },
    textRight: { textAlign: "right" },
    textBlack: { color: colors.black },
    textRed: { color: colors.red },
    textYellow: { color: colors.yellow },
    textLightBlue: { color: colors.lightBlue },
    textLightGreen: { color: colors.lightGreen },
    textLightGrey: { color: colors.lightGrey },
    textDarkGrey: { color: colors.darkGrey },
    textWhite: { color: "#fff" },

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
}