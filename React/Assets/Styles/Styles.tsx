// TODO

import {StyleSheet} from 'react-native';

import SIZES from './Sizes.json';
import FONTS from './Fonts.json';
import COLORS from './Colors.json';

const STYLES = StyleSheet.create({
  background: {
    backgroundColor: COLORS.grey,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.grey,
  },
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    margin: SIZES.basePadding,
    rowGap: SIZES.baseGap,
    paddingBottom: SIZES.paddingBottomNavigation,
  },
  noContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: SIZES.basePadding,
  },
  centerContentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.baseMargin * 2,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
    rowGap: SIZES.baseGap,
  },
  rowContainer: {
    flexDirection: 'row',
    columnGap: SIZES.baseGap / 2,
  },
  centerRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerColumnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: SIZES.baseGap,
  },
  textContainer: {
    flex: 1,
    margin: SIZES.basePadding / 2,
  },
  fabRightContainer: {
    position: 'absolute',
    bottom: SIZES.baseMargin,
    right: SIZES.baseMargin,
  },
  ribbonRightContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: COLORS.green,
    paddingHorizontal: SIZES.ribbonPaddingHorizontal,
    paddingVertical: SIZES.ribbonPaddingVertical,
    borderBottomRightRadius: SIZES.baseBorderRadius,
  },
  ribbonLeftContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: COLORS.green,
    paddingHorizontal: SIZES.ribbonPaddingHorizontal,
    paddingVertical: SIZES.ribbonPaddingVertical,
    borderBottomLeftRadius: SIZES.baseBorderRadius,
  },
  separatorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.basePadding,
    marginBottom: (SIZES.basePadding / 3) * 4,
  },
  tabContainer: {
    backgroundColor: COLORS.secondaryGrey,
    paddingVertical: SIZES.basePadding,
    paddingHorizontal: (SIZES.basePadding / 2) * 3,
    borderBottomWidth: (SIZES.baseBorderWidth / 2) * 3,
  },

  noContentText: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.headerText,
    textAlign: 'center',
  },
  textTitleHeader: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.headerText * 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textHeader: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.headerText,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInfo: {
    color: COLORS.inputTextDark,
    fontSize: FONTS.smallText,
    textAlign: 'center',
  },
  textRemoveInfo: {
    flex: 1,
    color: COLORS.white,
    fontSize: FONTS.mediumText - 1,
  },
  textTab: {
    fontSize: FONTS.mediumText - 1,
    fontWeight: 'bold',
  },
  textTabBar: {
    fontSize: FONTS.smallText,
    fontWeight: 'bold',
  },
  ribbonText: {
    color: COLORS.black,
    fontSize: FONTS.ribbonText,
    fontWeight: 'bold',
  },
  separatorText: {
    color: COLORS.silver,
    textTransform: 'uppercase',
  },
  darkCenterStandardText: {
    color: COLORS.inputTextDark,
    fontSize: FONTS.standardText,
    textAlign: 'center',
  },
  centerStandardText: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.standardText,
    textAlign: 'center',
  },
  boldStandardText: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.standardText,
    fontWeight: 'bold',
  },
  mediumText: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.mediumText,
  },
  standardText: {
    fontSize: FONTS.standardText,
  },
  standardSegmentText: {
    fontSize: FONTS.standardText - 1,
  },
  helperInputText: {
    textAlign: 'center',
    fontSize: FONTS.smallText,
    marginVertical: -SIZES.baseMargin / 5,
  },
  labelInputText: {
    fontSize: FONTS.smallText,
    paddingHorizontal: SIZES.basePadding / 2,
    top: -SIZES.baseMargin / 5,
  },

  defaultFlex: {
    flex: 1,
  },
  icon: {
    marginRight: (SIZES.baseMargin / 3) * 2,
  },
  menuIcon: {
    width: SIZES.icon,
    height: SIZES.icon,
  },
  image: {
    height: SIZES.image,
    width: '100%',
  },
  textToButton: {
    paddingVertical: SIZES.textToButton,
  },
  copyright: {
    color: COLORS.inputTextDark,
    fontSize: FONTS.smallText - 4,
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  flatListTopMargin: {
    marginTop: SIZES.basePadding / 2,
    paddingBottom: SIZES.paddingBottomNavigation,
  },
  flatListBottomMargin: {
    marginBottom: SIZES.marginBottomFAB,
  },
  separatorLine: {
    flex: 1,
    backgroundColor: COLORS.silver,
    height: SIZES.separatorLineHeight,
  },

  ///////////////////
  graphContainer: {
    height: SIZES.measuresGraphContainerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryGrey,
    paddingTop: SIZES.basePadding,
    paddingHorizontal: SIZES.basePadding,
    marginBottom: SIZES.basePadding,
    borderBottomLeftRadius: SIZES.baseBorderRadius,
    borderBottomRightRadius: SIZES.baseBorderRadius,
    elevation: SIZES.baseElevation,
  },
  homeInputText: {
    color: COLORS.white,
    textAlign: 'center',
    padding: 0,
    width: SIZES.inputServeWidth,
    backgroundColor: COLORS.grey,
    borderWidth: SIZES.baseBorderWidth,
    borderColor: COLORS.grey,
    borderRadius: SIZES.baseBorderRadius,
  },
  dayServeContainer: {
    borderWidth: SIZES.baseBorderWidth,
    borderRadius: SIZES.baseBorderRadius,
    borderColor: COLORS.gold,
    padding: SIZES.basePadding,
    marginTop: SIZES.basePadding / 2 + 1,
  },
  dayServeText: {
    color: COLORS.white,
    fontSize: FONTS.mediumText,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingBottom: SIZES.basePadding / 2,
  },
  alertHeaderText: {
    color: COLORS.white,
    fontSize: FONTS.headerText,
    textAlign: 'center',
  },
  alertDescriptionText: {
    color: COLORS.white,
    fontSize: FONTS.standardText,
    textAlign: 'center',
  },

  cardContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryGrey,
    marginVertical: SIZES.baseMargin / 3,
    marginHorizontal: SIZES.baseMargin,
    borderRadius: SIZES.baseBorderRadius,
    elevation: SIZES.baseElevation,
    paddingHorizontal: SIZES.basePadding,
    paddingVertical: SIZES.basePadding + 2,
    alignItems: 'center',
  },
  remainingCardContent: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.grey,
    borderRadius: SIZES.baseBorderRadius,
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  cardRemainingContainer: {
    marginRight: -5,
    flexDirection: 'column',
    rowGap: 6,
  },
  textCardName: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.mediumText,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  remainingCardText: {
    color: COLORS.gold,
    fontSize: FONTS.standardText - 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  remainingIcon: {
    marginRight: SIZES.basePadding / 2,
  },

  navigationHeader: {
    backgroundColor: COLORS.grey,
    height: SIZES.navigationHeader,
  },
  navigationHeaderTitle: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.headerText - 4,
    fontWeight: 'bold',
  },
  rowMarginContainer: {
    flexDirection: 'row',
    margin: SIZES.baseMargin,
  },
  separatorLineVertical: {
    borderRightWidth: SIZES.separatorLineHeight,
    borderRightColor: COLORS.inputTextDark,
  },
  iconStyleChecked: {
    borderColor: COLORS.green,
    borderWidth: SIZES.baseBorderWidth,
  },
  iconStyleUnChecked: {
    borderColor: COLORS.gold,
    borderWidth: SIZES.baseBorderWidth,
  },
  checkBoxText: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.mediumText,
    textDecorationLine: 'none',
    fontWeight: 'bold',
  },
  checkBox: {
    marginLeft: SIZES.baseMargin / 2,
    paddingVertical: SIZES.basePadding,
  },

  gridContainer: {
    flex: 1,
    margin: SIZES.baseMargin / 3,
    elevation: SIZES.baseElevation,
  },
  gridUpperSection: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: SIZES.basePadding / 3,
    paddingBottom: SIZES.basePadding / 3,
    borderTopLeftRadius: SIZES.baseBorderRadius,
    borderTopRightRadius: SIZES.baseBorderRadius,
  },
  gridMiddle3Section: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryGrey,
    paddingTop: SIZES.basePadding / 2,
    paddingBottom: SIZES.basePadding / 2,
  },
  gridMiddle2Section: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryGrey,
    paddingTop: (SIZES.basePadding / 4) * 7,
    paddingBottom: (SIZES.basePadding / 4) * 7,
    borderBottomLeftRadius: SIZES.baseBorderRadius,
    borderBottomRightRadius: SIZES.baseBorderRadius,
  },
  gridLowerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryGrey,
    paddingTop: SIZES.basePadding / 2,
    paddingBottom: SIZES.basePadding / 2,
    borderBottomLeftRadius: SIZES.baseBorderRadius,
    borderBottomRightRadius: SIZES.baseBorderRadius,
  },
  gridTitle: {
    color: COLORS.inputTextBlack,
    fontSize: FONTS.mediumText,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gridMiddleDescription: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.standardText,
    textAlign: 'center',
  },
  gridLowerDescription: {
    color: COLORS.inputTextDefault,
    fontSize: FONTS.smallText,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  popableBigStyle: {
    width: 150,
  },
  popableSmallStyle: {
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.baseMargin,
    borderRadius: SIZES.baseBorderRadius,
  },
  buttonText: {
    color: COLORS.inputTextBlack,
    fontSize: FONTS.standardText,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SIZES.basePadding * 2,
    columnGap: SIZES.baseGap * 2,
    backgroundColor: COLORS.secondaryGrey,
    borderBottomLeftRadius: SIZES.baseBorderRadius * 3,
    borderBottomRightRadius: SIZES.baseBorderRadius * 3,
    elevation: SIZES.baseElevation,
  },
});

export default STYLES;
