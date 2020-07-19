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
    darkBlue: "#199a8b",
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
    f1: 12,
    f2: 16,
    f3: 20,
    f4: 22,
    f5: 26,
    fPrimary: Platform.OS === 'ios' ? "Arial" : "Verdana"
}

export const components = {
    positionAbsolute: { position: "absolute" },

    flex1: { flex: 1 },
    dNone: { display: "none" },
    dFlex: { display: "flex" },
    flexGrow1: { flexGrow: 1 },

    bottom0: { bottom: 0 },
    right0: { right: 0 },
    left0: { left: 0 },
    top0: { top: 0 },

    opacityHigh: { opacity: 1 },
    opacityLow: { opacity: 0.7 },

    

    alignCenter: { alignSelf: "center" },

    fullWidthImage: { width: dimensions.fullWidth - 50, height: dimensions.fullWidth - 50},
    halfWidthImage: { width: dimensions.halfWidth, height: dimensions.halfWidth},


    m1: { margin: spacing.s1 },
    m2: { margin: spacing.s2 },
    m3: { margin: spacing.s3 },
    m4: { margin: spacing.s4 },
    m5: { margin: spacing.s5 },

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

    p1: { padding: spacing.s1 },
    p2: { padding: spacing.s2 },
    p3: { padding: spacing.s3 },
    p4: { padding: spacing.s4 },
    p5: { padding: spacing.s5 },

    px1: { paddingHorizontal: spacing.s1 },
    px2: { paddingHorizontal: spacing.s2 },
    px3: { paddingHorizontal: spacing.s3 },
    px4: { paddingHorizontal: spacing.s4 },
    px5: { paddingHorizontal: spacing.s5 },
    
    py1: { paddingHorizontal: spacing.s1 },
    py2: { paddingVertical: spacing.s2 },
    py3: { paddingVertical: spacing.s3 },
    py4: { paddingVertical: spacing.s4 },
    py5: { paddingVertical: spacing.s5 },

    pt1: { paddingTop: spacing.s1 },
    pt2: { paddingTop: spacing.s2 },
    pt3: { paddingTop: spacing.s3 },
    pt4: { paddingTop: spacing.s4 },
    pt5: { paddingTop: spacing.s5 },
    
    pr1: { paddingRight: spacing.s1 },
    pr2: { paddingRight: spacing.s2 },
    pr3: { paddingRight: spacing.s3 },
    pr4: { paddingRight: spacing.s4 },
    pr5: { paddingRight: spacing.s5 },
    
    pb1: { paddingBottom: spacing.s1 },
    pb2: { paddingBottom: spacing.s2 },
    pb3: { paddingBottom: spacing.s3 },
    pb4: { paddingBottom: spacing.s4 },
    pb5: { paddingBottom: spacing.s5 },
    
    pl1: { paddingLeft: spacing.s1 },
    pl2: { paddingLeft: spacing.s2 },
    pl3: { paddingLeft: spacing.s3 },
    pl4: { paddingLeft: spacing.s4 },
    pl5: { paddingLeft: spacing.s5 },
    
    bgYellow: { backgroundColor: colors.yellow },
    bgLightGrey: { backgroundColor: colors.lightGrey },
    bgDarkGrey: { backgroundColor: colors.darkGrey },
    
    textBlack: { color: colors.black },
    textRed: { color: colors.red },
    textYellow: { color: colors.yellow },
    textLightBlue: { color: colors.lightBlue },
    textLightGreen: { color: colors.lightGreen },
    textLightGrey: { color: colors.lightGrey },
    textDarkGrey: { color: colors.darkGrey },
    textWhite: { color: "#fff" },
    
    textLeft: { textAlign: "left" },
    textCenter: { textAlign: "center" },
    textRight: { textAlign: "right" },
    
    textUppercase: { textTransform: "uppercase" },
    textBold: { fontWeight: "bold" },
    textUnderline: { textDecorationLine: "underline" },
    
    textXs: {fontSize: fonts.f1},
    textSm: {fontSize: fonts.f2},
    textMd: {fontSize: fonts.f3},
    textLg: {fontSize: fonts.f4},
    textXl: {fontSize: fonts.f5},
    
    h1: {fontSize: fonts.f5, fontWeight: "bold"},
    h2: {fontSize: fonts.f4, fontWeight: "bold"},
    h3: {fontSize: fonts.f3, fontWeight: "bold"},
    h4: {fontSize: fonts.f2, fontWeight: "bold"},
    h5: {fontSize: fonts.f1, fontWeight: "bold"},

    borderRounded: {borderWidth: 0, borderRadius: 100},
}