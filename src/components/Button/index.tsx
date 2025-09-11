import { moderateScale, verticalScale } from '@/utils/responsive';
import { Text } from '@/components/Text';
import { useTheme } from '@/styles/theme';
import { PropsWithChildren } from 'react';
import { StyleSheet, Pressable, GestureResponderEvent } from 'react-native';

type Props = PropsWithChildren & {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};

export default function Button({ text, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.primary, opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <Text
        font="sfBold"
        size="h7"
        style={[styles.text, { color: colors.white }]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: verticalScale(56),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
  },
  text: { textAlign: 'center' },
});
