import { scale } from '@/utils/responsive';
import { GestureResponderEvent, Pressable, StyleSheet } from 'react-native';
import { CloseIcon } from '../Icons/CloseIcon';
import { useTheme } from '@/styles/theme';

type Props = {
  onPress?: ((event: GestureResponderEvent) => void) | null;
};
export default function CloseButton({ onPress }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.closeButtonBackground,
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <CloseIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(24),
    height: scale(24),
  },
});
