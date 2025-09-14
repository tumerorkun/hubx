import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  loopDuration: number; // seconds
  gap?: number;
} & ViewProps;

export function InfiniteCarousel({
  style,
  loopDuration,
  children,
}: PropsWithChildren<Props>) {
  return (
    <View style={[style, styles.row]}>
      <Animated.View
        style={[
          styles.row,
          {
            animationName: {
              from: { transform: [{ translateX: 0 }] },
              to: { transform: [{ translateX: '-100%' }] },
            },
            animationDuration: `${loopDuration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          },
        ]}
      >
        {children}
      </Animated.View>
      <Animated.View
        style={[
          styles.row,
          styles.absolute,
          {
            animationName: {
              from: { transform: [{ translateX: '100%' }] },
              to: { transform: [{ translateX: 0 }] },
            },
            animationDuration: `${loopDuration}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  absolute: { position: 'absolute' },
});
