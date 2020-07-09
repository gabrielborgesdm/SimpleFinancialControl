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
    darkGreen: "#399A68",
    lightGrey: "#F4F4F8",
    darkGrey: "#47484a",
}
  
export const spacing = {
    s1: 5,
    s2: 10,
    s3: 20,
    s4: 30,
    s5: 40
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
    dNone: { display: "none" },
    dFlex: { display: "flex" },

    bottom0: { bottom: 0 },
    right0: { right: 0 },
    left0: { left: 0 },
    top0: { top: 0 },

    opacityHigh: { opacity: 1 },
    opacityLow: { opacity: 0.7 },

    alignCenter: { alignSelf: "center" },

    mx1: { marginHorizontal: spacing.s1 },
    mx2: { marginHorizontal: spacing.s2 },
    mx3: { marginHorizontal: spacing.s3 },
    mx4: { marginHorizontal: spacing.s4 },
    mx5: { marginHorizontal: spacing.s5 },
    
    my1: { marginHorizontal: spacing.s1 },
    my2: { marginVertical: spacing.s2 },
    my3: { marginVertical: spacing.s3 },
    my4: { marginVertical: spacing.s4 },
    my5: { marginVertical: spacing.s5 },

    mt1: { marginTop: spacing.s1 },
    mt2: { marginTop: spacing.s2 },
    mt3: { marginTop: spacing.s3 },
    mt4: { marginTop: spacing.s4 },
    mt5: { marginTop: spacing.s5 },
    
    mr1: { marginRight: spacing.s1 },
    mr2: { marginRight: spacing.s2 },
    mr3: { marginRight: spacing.s3 },
    mr4: { marginRight: spacing.s4 },
    mr5: { marginRight: spacing.s5 },
    
    mb1: { marginBottom: spacing.s1 },
    mb2: { marginBottom: spacing.s2 },
    mb3: { marginBottom: spacing.s3 },
    mb4: { marginBottom: spacing.s4 },
    mb5: { marginBottom: spacing.s5 },
    
    ml1: { marginLeft: spacing.s1 },
    ml2: { marginLeft: spacing.s2 },
    ml3: { marginLeft: spacing.s3 },
    ml4: { marginLeft: spacing.s4 },
    ml5: { marginLeft: spacing.s5 },
    
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