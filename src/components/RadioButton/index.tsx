import { verticalScale, moderateScale, scale } from '@/utils/responsive';
import {
  Canvas,
  Rect,
  LinearGradient,
  vec,
  BackdropBlur,
  interpolateColors,
} from '@shopify/react-native-skia';
import {
  View,
  Pressable,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReactNode } from 'react';
import { useTheme } from '@/styles/theme';

type Props = {
  id: string;
  activeId: SharedValue<string>;
  onPress?: ((event: GestureResponderEvent) => void) | null;
  tag?: ReactNode;
  title?: ReactNode;
  info?: ReactNode;
};
const timingOption = { duration: 200 };
export function RadioButton({
  id,
  activeId,
  onPress,
  tag,
  title,
  info,
}: Props) {
  const { colors } = useTheme();
  const size = useSharedValue({ width: 0, height: 0 });
  const rect = useDerivedValue(() => {
    const { width, height } = size.value;
    return { x: 0, y: 0, width, height };
  });

  const gradientEnd = useDerivedValue(() => {
    return vec(rect.value.width, 0);
  });

  const gradientIndex = useDerivedValue(() => {
    if (activeId.value === id) {
      return withTiming(0, timingOption);
    }
    return withTiming(1, timingOption);
  });
  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColors(
        gradientIndex.value,
        [0, 1],
        [colors.radioButtonGradientStart, 'transparent'],
      ),
      interpolateColors(
        gradientIndex.value,
        [0, 1],
        [colors.radioButtonGradientEnd, 'transparent'],
      ),
    ];
  });

  const animatedBgColors = useDerivedValue(() => {
    if (activeId.value !== id) {
      return withTiming(colors.white03, timingOption);
    }
    return withTiming('transparent', timingOption);
  });
  const radioButtonColor = useAnimatedStyle(() => {
    if (activeId.value === id) {
      return { backgroundColor: withTiming(colors.primary, timingOption) };
    }
    return {
      backgroundColor: withTiming(
        colors.radioButtonDotIdleBackground,
        timingOption,
      ),
    };
  });
  const radioButtonDot = useAnimatedStyle(() => {
    if (activeId.value === id) {
      return { opacity: withTiming(1, timingOption) };
    }
    return { opacity: withTiming(0, timingOption) };
  });
  const selectedBorder = moderateScale(1.5);
  const otherBorder = moderateScale(0.5);
  const buttonAnimatedStyles = useAnimatedStyle(() => {
    if (activeId.value === id) {
      return {
        borderWidth: selectedBorder,
        borderColor: withTiming(colors.primary, timingOption),
      };
    }
    return {
      borderWidth: otherBorder,
      borderColor: withTiming(colors.radioButtonIdleBorder, timingOption),
    };
  });
  const tagAnimatedStyles = useAnimatedStyle(() => {
    if (activeId.value === id) {
      return { backgroundColor: withTiming(colors.primary, timingOption) };
    }
    return {
      backgroundColor: withTiming(colors.radioButtonIdleBorder, timingOption),
    };
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Animated.View style={[styles.buttonContainer, buttonAnimatedStyles]}>
        <Canvas
          style={[
            styles.canvasBg,
            { backgroundColor: colors.paywallBackground },
          ]}
          onSize={size}
        >
          <Rect rect={rect} color={animatedBgColors}>
            <BackdropBlur blur={100} clip={rect}></BackdropBlur>
          </Rect>

          <Rect rect={rect}>
            <LinearGradient
              start={vec(0, 0)}
              end={gradientEnd}
              positions={[0, 0.6851]}
              colors={gradientColors}
            />
          </Rect>
        </Canvas>
      </Animated.View>
      {tag ? (
        <Animated.View style={[styles.tagContainer, tagAnimatedStyles]}>
          {tag}
        </Animated.View>
      ) : null}
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.radioButton, radioButtonColor]}>
          <Animated.View
            style={[
              styles.radioButtonDot,
              { backgroundColor: colors.white },
              radioButtonDot,
            ]}
          />
        </Animated.View>
        <View style={styles.infoContainer}>
          {title}
          {info}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    height: verticalScale(60),
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    height: verticalScale(60),
    borderRadius: moderateScale(14),
    boxSizing: 'border-box',
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
  canvasBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -1,
  },
  tagContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: verticalScale(26),
    width: scale(77),
    borderBottomLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(13.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: scale(4),
  },
  contentContainer: {
    flex: 1,
    paddingLeft: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(12),
  },
  radioButton: {
    width: scale(24),
    height: scale(24),
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: '100%',
  },
  infoContainer: {
    flexShrink: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    gap: verticalScale(1),
  },
});
