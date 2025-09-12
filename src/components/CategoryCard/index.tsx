import { Category } from '@/apis/types';
import { moderateScale, scale, width } from '@/utils/responsive';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/Text';
import { useTheme } from '@/styles/theme';

type Props = { data: Category };

export default function CategoryCard({ data }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <ImageBackground
        src={data.image.url}
        style={{ flex: 1, padding: scale(16), boxSizing: 'border-box' }}
        imageStyle={[styles.image, { borderColor: colors.categoryCardBorer }]}
      >
        <Text font="rubikMedium" size="h7">
          {data.title}
        </Text>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scale(152),
    overflow: 'hidden',
  },
  image: {
    objectFit: 'fill',
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(0.5),
  },
});
