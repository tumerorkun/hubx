import { useTheme } from '@/styles/theme';
import { width as screenWidth, scale, width } from '@/utils/responsive';
import {
  Children,
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Context = {
  scrollX: SharedValue<number>;
  data: ReactElement<{ id: string }>[];
  setData: (data: ReactElement<{ id: string }>[]) => void;
  scrollToIndex: (index: number) => void;
  getCurrentIndex: () => number;
  ref: React.RefObject<Animated.FlatList | null>;
};

const SimpleCarouselContext = createContext<Context | null>(null);
export default function SimpleCarouselProvider({
  children,
}: PropsWithChildren) {
  const [data, setData] = useState<ReactElement<{ id: string }>[]>([]);
  const ref = useRef<Animated.FlatList>(null);
  const scrollX = useSharedValue(0);
  const getCurrentIndex = useCallback(
    () => Math.round(scrollX.get() / width),
    [],
  );
  const scrollToIndex = useCallback(
    (index: number) => {
      if (ref.current && data.length > index && index >= 0) {
        ref.current.scrollToIndex({ index });
      }
    },
    [data],
  );
  const context = useMemo(
    () => ({
      scrollX: scrollX,
      data,
      setData,
      ref,
      scrollToIndex,
      getCurrentIndex,
    }),
    [data],
  ) as Context;
  return (
    <SimpleCarouselContext value={context}>{children}</SimpleCarouselContext>
  );
}

export const useSimpleCarousel = () => {
  const context = useContext(SimpleCarouselContext);

  if (!context) {
    throw new Error("Don't forget to add SimpleCarouselProvider");
  }
  return context;
};

export const SimpleCarouselDots = () => {
  const { scrollX, data } = useSimpleCarousel();
  return (
    <View style={styles.paginationContainer}>
      {[...data, { props: { id: 'empty' } }].map(({ props: { id } }, index) => {
        const inputRange = [
          (index - 1) * screenWidth,
          index * screenWidth,
          (index + 1) * screenWidth,
        ];
        return <Dot key={id} inputRange={inputRange} scrollX={scrollX!} />;
      })}
    </View>
  );
};

export const SimpleCarousel: FC<PropsWithChildren> = ({ children }) => {
  const { scrollX, data, setData, ref } = useSimpleCarousel();

  useEffect(() => {
    if (data.length === 0) {
      setData(
        Children.toArray(children) as ReactElement<{
          id: string;
        }>[],
      );
    }
  }, [children]);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX!.value = event.contentOffset.x;
  });

  return (
    <View style={styles.screenBase}>
      <Animated.FlatList
        ref={ref}
        keyExtractor={child => String(child.props.id)}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index: index,
        })}
        data={data}
        renderItem={({ item, index }) => (
          <Page index={index} scrollX={scrollX!}>
            {item}
          </Page>
        )}
        pagingEnabled
        horizontal
        renderToHardwareTextureAndroid
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const Page: FC<
  PropsWithChildren<{ index: number; scrollX: SharedValue<number> }>
> = ({ children, index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP,
    ),
  }));
  return (
    <Animated.View style={[styles.listItem, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const Dot = ({
  scrollX,
  inputRange,
}: {
  scrollX: SharedValue<number>;
  inputRange: number[];
}) => {
  const { colors } = useTheme();
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      inputRange,
      [0.25, 1, 0.25],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          inputRange,
          [0.6, 1, 0.6],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));
  return (
    <Animated.View
      style={[
        styles.paginationDot,
        { backgroundColor: colors.black },
        animatedStyle,
      ]}
    />
  );
};

export const styles = StyleSheet.create({
  paginationDot: { aspectRatio: 1, borderRadius: '100%', width: scale(10) },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(8),
  },
  listItem: { flex: 1, justifyContent: 'center', width: screenWidth },
  screenBase: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
