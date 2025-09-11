import { useTheme as useNativeTheme } from '@react-navigation/native';

const navigationThemeColors = {
  primary: '#28AF6E',
  background: '#FBFAFA',
  card: '#ffffffeb',
  text: '#13231B',
  border: '#FFFFFF3D',
  notification: '#28AF6E',
};
export const Colors = {
  ...navigationThemeColors,
  // custom colors
  white: '#FFFFFF',
  white03: '#ffffff08',
  white10: '#ffffff1a',
  white70: '#ffffffb3',
  white88: '#ffffffe0',
  black: '#000000',
  black25: '#00000040',
  black40: '#00000066',
  categoryCardBorer: '#3c3c441a',
  closeButtonBackground: '#00000066',
  thirdText: '#597165',
  tabIconDisabled: '#BDBDBD',
  searchIcon: '#ABABAB',
  searchBarBorder: '#3c3c4340',
  paywallBackground: '#101E17',
  paywallFeatureCardBackground: '#23302a',
  premiumButtonBackground: '#24201A',
  premiumButtonCaret: '#D0B070',
  premiumTitleGradientStart: '#E6C990',
  premiumTitleGradientEnd: '#E4B046',
  premiumInfoGradientStart: '#F5C25B',
  premiumInfoGradientEnd: '#FFDE9C',
  radioButtonIdleBorder: '#606965ff',
  radioButtonDotIdleBackground: '#2f3a35ff',
  radioButtonGradientStart: '#28AF6E00',
  radioButtonGradientEnd: '#28AF6E3D',
  placeholderText: '#AFAFAF',
  tabBarBorder: '#13231B1A',
  tabBarLabel: '#979798',
} as const;

const theme = {
  dark: false,
  colors: Colors as ReactNavigation.Theme['colors'],
  fonts: {},
} as ReactNavigation.Theme;

export default theme;

export const useTheme = () => {
  return useNativeTheme() as unknown as { colors: typeof Colors };
};
