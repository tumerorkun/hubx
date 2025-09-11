import { Text } from '@/components/Text';
import { moderateScale, scale, verticalScale, width } from '@/utils/responsive';
import { useTheme } from '@/styles/theme';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Canvas,
  Image as SkImage,
  Shadow,
  useImage,
  Rect,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import Button from '@/components/Button';
import SimpleCarouselProvider, {
  SimpleCarousel,
  SimpleCarouselDots,
  useSimpleCarousel,
} from '@/components/SimpleCarousel';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function Onboarding() {
  return (
    <SimpleCarouselProvider>
      <_Onboarding />
    </SimpleCarouselProvider>
  );
}

function _Onboarding() {
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const { scrollToIndex, getCurrentIndex } = useSimpleCarousel();
  const navigation = useNavigation();
  const onboarding1LineImage = useImage(
    require('@assets/images/onboarding_1_line.png'),
  );
  const onboarding2LineImage = useImage(
    require('@assets/images/onboarding_2_line.png'),
  );

  if (!onboarding1LineImage) return null;
  if (!onboarding2LineImage) return null;
  return (
    <ImageBackground
      style={[styles.container, { paddingTop: top + verticalScale(12) }]}
      source={require('@assets/images/onboarding_background.png')}
    >
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          <SimpleCarousel>
            <View id="first" style={{ flex: 1, paddingBottom: bottom }}>
              <View style={styles.headerContainer}>
                <View style={styles.header1}>
                  <Text
                    font="rubikMedium"
                    size="h1"
                    style={[styles.text1, { color: colors.text }]}
                  >
                    Take a photo to <Text font="rubikXBold">identify</Text> the
                    plant!
                  </Text>
                </View>
              </View>

              <ImageBackground
                style={{ flex: 1 }}
                source={require('@assets/images/onboarding_1_content.png')}
              />
              <Canvas style={StyleSheet.absoluteFill}>
                <SkImage
                  image={onboarding1LineImage}
                  x={moderateScale(197)}
                  y={verticalScale(26.11)}
                  width={scale(143)}
                  height={verticalScale(31)}
                />
              </Canvas>
            </View>
            <View id="second" style={{ flex: 1, paddingBottom: bottom }}>
              <View style={styles.headerContainer}>
                <View style={styles.header2}>
                  <Text
                    font="rubikMedium"
                    size="h1"
                    style={[
                      styles.textShadow,
                      styles.text2,
                      { color: colors.text },
                    ]}
                  >
                    Get plant <Text font="rubikXBold">care guides</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.body2}>
                <Image
                  source={require('@assets/images/onboarding_2_content_bg.png')}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: width,
                    height: scale(516.5),
                  }}
                />
                <View style={styles.body2artworkContainer}>
                  <Image
                    source={require('@assets/images/onboarding_2_content.png')}
                    style={{ width: scale(260), height: scale(540) }}
                  />
                  <Image
                    source={require('@assets/images/onboarding_2_artwork.png')}
                    style={{
                      position: 'absolute',
                      top: verticalScale(-59),
                      left: 0,
                      width: width,
                      height: scale(270),
                    }}
                  />
                </View>
              </View>
              <Canvas style={StyleSheet.absoluteFill}>
                <SkImage
                  image={onboarding2LineImage}
                  x={moderateScale(139)}
                  y={verticalScale(28.11)}
                  width={scale(154.5)}
                  height={verticalScale(30)}
                >
                  <Shadow
                    dx={0}
                    dy={moderateScale(4)}
                    blur={moderateScale(2)}
                    color={colors.black40}
                  />
                </SkImage>
              </Canvas>
              <Canvas
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: verticalScale(235),
                  left: 0,
                  bottom: 0,
                }}
              >
                <Rect x={0} y={0} width={width} height={verticalScale(235)}>
                  <LinearGradient
                    start={vec(width / 2, 0)}
                    end={vec(width / 2, verticalScale(235))}
                    positions={[0, 0.72]}
                    colors={['#FFFFFF00', colors.white]}
                  />
                </Rect>
              </Canvas>
            </View>
          </SimpleCarousel>
        </View>
        <View style={[styles.bottomContainer, { paddingBottom: bottom }]}>
          <Button
            text="Continue"
            onPress={e => {
              e.stopPropagation();
              const currentIndex = getCurrentIndex();
              if (currentIndex === 1) {
                navigation.navigate('Paywall');
              }
              scrollToIndex(currentIndex + 1);
            }}
          />
          <View style={styles.paginationContainer}>
            <SimpleCarouselDots />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative', justifyContent: 'flex-end' },
  underline: { textDecorationLine: 'underline' },
  textShadow: {
    textShadowColor: '#00000040',
    textShadowOffset: { width: 0, height: moderateScale(4) },
    textShadowRadius: moderateScale(4),
  },
  bottomContainer: {
    paddingHorizontal: scale(24),
  },
  paginationContainer: {
    paddingBottom: verticalScale(12.5),
    paddingTop: verticalScale(32.5),
  },
  headerContainer: {
    paddingLeft: scale(24),
  },
  header1: {
    width: scale(303),
  },
  text1: { letterSpacing: moderateScale(-1) },
  header2: {
    width: scale(277),
    height: verticalScale(49),
    justifyContent: 'flex-start',
  },
  text2: {
    lineHeight: verticalScale(49),
    marginTop: verticalScale(-7.89),
    letterSpacing: moderateScale(-1),
  },
  body2: {
    flex: 1,
    paddingBottom: verticalScale(51),
    justifyContent: 'flex-end',
    position: 'relative',
  },
  body2artworkContainer: {
    position: 'relative',
    paddingHorizontal: scale(57),
  },
});
