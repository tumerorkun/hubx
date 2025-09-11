import React, { useState, PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

type Props = {
  loopDuration: number; // seconds
  gap?: number;
} & ViewProps;

export function InfiniteCarousel({
  style,
  loopDuration,
  children,
}: PropsWithChildren<Props>) {
  const [contentWidth, setContentWidth] = useState(0);

  const mainGroupStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withDelay(
          1000,
          withRepeat(
            withSequence(
              withTiming(0, {
                easing: Easing.linear,
                duration: 0,
              }),
              withTiming(-contentWidth, {
                easing: Easing.linear,
                duration: loopDuration * 1000,
              }),
              withTiming(contentWidth, {
                duration: 0,
                easing: Easing.linear,
              }),
              withTiming(0, {
                duration: loopDuration * 1000,
                easing: Easing.linear,
              }),
            ),
            -1,
          ),
        ),
      },
    ],
  }));

  const copyGroupStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withDelay(
          1000,
          withRepeat(
            withSequence(
              withTiming(contentWidth, {
                duration: 0,
                easing: Easing.linear,
              }),
              withTiming(0, {
                duration: loopDuration * 1000,
                easing: Easing.linear,
              }),
              withTiming(-contentWidth, {
                duration: loopDuration * 1000,
                easing: Easing.linear,
              }),
              withTiming(contentWidth, {
                duration: 0,
                easing: Easing.linear,
              }),
            ),
            -1,
          ),
        ),
      },
    ],
  }));

  return (
    <View style={[style, styles.row]}>
      <Animated.View
        onLayout={({ nativeEvent: { layout } }) =>
          setContentWidth(layout.width)
        }
        style={[styles.row, mainGroupStyles]}
      >
        {children}
      </Animated.View>
      <Animated.View style={[styles.row, styles.absolute, copyGroupStyles]}>
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  absolute: { position: 'absolute' },
});
