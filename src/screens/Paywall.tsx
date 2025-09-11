import { InfiniteCarousel } from '@/components/InfiniteCarousel';
import Button from '@/components/Button';
import Card from '@/components/PaywallFeatureCard';
import CloseButton from '@/components/CloseButton';
import { RadioButton } from '@/components/RadioButton';
import { Text } from '@/components/Text';
import { moderateScale, scale, verticalScale } from '@/utils/responsive';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, actions } from '@/store';
import { useTheme } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';

export default function Paywall() {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedTier = useSharedValue('1_year');

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top, backgroundColor: colors.paywallBackground },
      ]}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        showHideTransition="fade"
        backgroundColor="transparent"
      />
      <ImageBackground
        source={require('@assets/images/paywall_content.png')}
        imageStyle={{ objectFit: 'fill' }}
        style={[StyleSheet.absoluteFill, styles.headerBacgkround]}
      />
      <View style={styles.header}>
        <CloseButton
          onPress={() => {
            dispatch(actions.setIsComplete(true));

            navigation.navigate('HomeTab', { screen: 'Home' });
          }}
        />
      </View>
      <View style={[styles.contentContainer, { paddingBottom: bottom }]}>
        <View>
          <View style={styles.contentTitleContainer}>
            <Text
              font="visbyExtraBold"
              size="h0"
              style={{ color: colors.white }}
            >
              PlantApp
              <Text font="rubikBold" size="h3">
                {' '}
              </Text>
              <Text font="rubikLight" size="h2">
                Premium
              </Text>
            </Text>
            <Text font="rubikLight" size="h5" style={{ color: colors.white }}>
              Access All Features
            </Text>
          </View>
          <InfiniteCarousel loopDuration={20}>
            <View style={styles.carouselContainer}>
              <Card
                icon={
                  <Image
                    source={require('@assets/images/paywall_scanner.png')}
                    style={{ width: scale(18), height: scale(18) }}
                  />
                }
                title={
                  <Text
                    font="rubikMedium"
                    size="h4"
                    style={{ color: colors.white }}
                  >
                    Unlimited
                  </Text>
                }
                info={
                  <Text
                    font="rubikRegular"
                    size="p1"
                    style={{ color: colors.white }}
                  >
                    Plant Identify
                  </Text>
                }
              />
              <Card
                shadowActive
                icon={
                  <Image
                    source={require('@assets/images/paywall_speed.png')}
                    style={{ width: scale(18), height: scale(18) }}
                  />
                }
                title={
                  <Text
                    font="rubikMedium"
                    size="h4"
                    style={{ color: colors.white }}
                  >
                    Faster
                  </Text>
                }
                info={
                  <Text
                    font="rubikRegular"
                    size="p1"
                    style={{ color: colors.white }}
                  >
                    Process
                  </Text>
                }
              />
              <Card
                icon={
                  <Image
                    source={require('@assets/images/paywall_speed.png')}
                    style={{ width: scale(18), height: scale(18) }}
                  />
                }
                title={
                  <Text
                    font="rubikMedium"
                    size="h4"
                    style={{ color: colors.white }}
                  >
                    Detailed
                  </Text>
                }
                info={
                  <Text
                    font="rubikRegular"
                    size="p1"
                    style={{ color: colors.white }}
                  >
                    Plant care
                  </Text>
                }
              />
            </View>
          </InfiniteCarousel>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              id="1_month"
              activeId={selectedTier}
              onPress={() => {
                selectedTier.value = '1_month';
              }}
              title={
                <Text
                  font="rubikMedium"
                  size="h6"
                  style={{ color: colors.white }}
                >
                  1 Month
                </Text>
              }
              info={
                <Text
                  font="rubikLight"
                  size="p2"
                  style={{ color: colors.white70 }}
                >
                  $2.99/month, <Text font="rubikRegular">auto renewable</Text>
                </Text>
              }
            />
            <RadioButton
              id="1_year"
              activeId={selectedTier}
              onPress={() => {
                selectedTier.value = '1_year';
              }}
              title={
                <Text
                  font="rubikMedium"
                  size="h6"
                  style={{ color: colors.white }}
                >
                  1 Year
                </Text>
              }
              tag={
                <Text
                  font="rubikMedium"
                  size="p2"
                  style={{ color: colors.white }}
                >
                  Save 50%
                </Text>
              }
              info={
                <Text
                  font="rubikRegular"
                  size="p2"
                  style={{ color: colors.white70 }}
                >
                  First 3 days free, then $529,99/year
                </Text>
              }
            />
          </View>
          <View style={styles.contentTitleContainer}>
            <View style={{ marginTop: verticalScale(26) }}>
              <Button text="Try free for 3 days" onPress={() => {}} />
            </View>
            <View style={{ paddingTop: moderateScale(8) }}>
              <Text
                font="rubikLight"
                size="p4"
                style={{
                  opacity: 0.52,
                  color: colors.white,
                  textAlign: 'center',
                }}
              >
                After the 3-day free trial period you’ll be charged ₺274.99 per
                year unless you cancel before the trial expires. Yearly
                Subscription is Auto-Renewable
              </Text>
            </View>
            <View style={{ paddingTop: moderateScale(10) }}>
              <Text
                font="rubikRegular"
                size="p3"
                style={{
                  opacity: 0.5,
                  color: colors.white,
                  textAlign: 'center',
                }}
              >
                {'Terms  •  Privacy  •  Restore'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBacgkround: {
    width: '100%',
    height: scale(490),
    pointerEvents: 'none',
  },
  header: {
    flexDirection: 'row-reverse',
    paddingRight: scale(16),
    paddingTop: verticalScale(8),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentTitleContainer: { paddingHorizontal: scale(24) },
  carouselContainer: {
    flexDirection: 'row',
    height: verticalScale(130),
    marginTop: verticalScale(20),
    paddingHorizontal: scale(4),
    gap: scale(8),
  },
  radioButtonContainer: {
    gap: verticalScale(16),
    marginTop: verticalScale(24),
    paddingHorizontal: scale(24),
  },
});
