import { ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from '@/store';
import { moderateScale, scale, verticalScale } from '@/utils/responsive';
import GetStarted from '@/screens/GetStarted';
import Onboarding from '@/screens/Onboarding';
import Paywall from '@/screens/Paywall';
import Home from '@/screens/Home';
import Scan from '@/screens/Scan';
import { useTheme } from '@/styles/theme';
import * as ICONS from '@/components/Icons';
import { Text } from '@/components/Text';
import type { HomeTabParamList, RootStackParamList } from './types';

export const RootStack = createStackNavigator<RootStackParamList>();
export const BottomTab = createBottomTabNavigator<HomeTabParamList>();

export const RootStackNavigation = () => {
  const isOnboardingCompleted = useSelector(s => s.onboarding.isComplete);
  return (
    <RootStack.Navigator
      initialRouteName={isOnboardingCompleted ? 'HomeTab' : 'GetStarted'}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name="GetStarted" component={GetStarted} />
      <RootStack.Screen name="Onboarding" component={Onboarding} />
      <RootStack.Screen name="Paywall" component={Paywall} />

      <RootStack.Screen
        name="HomeTab"
        component={HomeTabNavigation}
        options={{ gestureEnabled: false }}
      />
    </RootStack.Navigator>
  );
};
const NOOP = () => null;
export const HomeTabNavigation = () => {
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.card,
          borderTopWidth: verticalScale(0.5),
          borderColor: colors.tabBarBorder,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: TabBarLabel,
          tabBarIcon: HomeTabBarIcon,
          popToTopOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="Diagnose"
        component={NOOP}
        options={{ tabBarIcon: DiagnoseTabBarIcon, tabBarLabel: TabBarLabel }}
      />
      <BottomTab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabelStyle: { display: 'none' },
          tabBarIcon: ScanTabBarIcon,
        }}
      />
      <BottomTab.Screen
        name="MyGarden"
        component={NOOP}
        options={{ tabBarIcon: MyGardenTabBarIcon, tabBarLabel: TabBarLabel }}
      />
      <BottomTab.Screen
        name="Profile"
        component={NOOP}
        options={{ tabBarIcon: ProfileTabBarIcon, tabBarLabel: TabBarLabel }}
      />
    </BottomTab.Navigator>
  );
};

const TabBarIconContainer = ({ children }: { children: ReactNode }) => {
  return (
    <View style={{ width: scale(25), height: scale(25) }}>{children}</View>
  );
};
const HomeTabBarIcon = ({ focused }: { focused: boolean }) => {
  const { colors } = useTheme();
  return (
    <TabBarIconContainer>
      <ICONS.HomeIcon
        color={focused ? colors.primary : colors.tabIconDisabled}
      />
    </TabBarIconContainer>
  );
};
const DiagnoseTabBarIcon = ({ focused }: { focused: boolean }) => {
  const { colors } = useTheme();
  return (
    <TabBarIconContainer>
      <ICONS.DiagnoseIcon
        color={focused ? colors.primary : colors.tabIconDisabled}
      />
    </TabBarIconContainer>
  );
};
const ScanTabBarIcon = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: scale(64),
        height: scale(64),
        marginTop: scale(-23),
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('@assets/images/home_tab_bar_scan_bg.png')}
        width={64}
        height={64}
        style={[
          StyleSheet.absoluteFill,
          { width: scale(64), height: scale(64) },
        ]}
      />
      <ICONS.ScanIcon color={colors.white} />
    </View>
  );
};
const ProfileTabBarIcon = ({ focused }: { focused: boolean }) => {
  const { colors } = useTheme();
  return (
    <TabBarIconContainer>
      <ICONS.ProfileIcon
        color={focused ? colors.primary : colors.tabIconDisabled}
      />
    </TabBarIconContainer>
  );
};
const MyGardenTabBarIcon = ({ focused }: { focused: boolean }) => {
  const { colors } = useTheme();
  return (
    <TabBarIconContainer>
      <ICONS.MyGardenIcon
        color={focused ? colors.primary : colors.tabIconDisabled}
      />
    </TabBarIconContainer>
  );
};

const TabBarLabel = ({
  focused,
  children,
}: {
  focused: boolean;
  children: string;
}) => {
  const { colors } = useTheme();
  return (
    <Text
      font="rubikRegular"
      style={{
        color: focused ? colors.primary : colors.tabBarLabel,
        fontSize: moderateScale(10),
        letterSpacing: moderateScale(-0.24),
      }}
    >
      {children}
    </Text>
  );
};
