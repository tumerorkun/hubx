import { Question } from '@/apis/types';
import { moderateScale, scale } from '@/utils/responsive';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/Text';
import { openLink } from '@/utils/inAppBrowser';
import { useTheme } from '@/styles/theme';

type Props = { data: Question };

export default function QuestionCard({ data }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={() => openLink(data.uri, { tintColor: colors.primary })}
    >
      <ImageBackground
        src={data.image_uri}
        style={styles.imgageContainer}
        imageStyle={[styles.image, { borderColor: colors.categoryCardBorer }]}
      >
        <View style={{ height: moderateScale(40), justifyContent: 'center' }}>
          <Text font="rubikMedium" size="h7" style={{ color: colors.white }}>
            {data.title}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { width: scale(240), height: scale(164), overflow: 'hidden' },
  imgageContainer: { flex: 1, justifyContent: 'flex-end', padding: scale(16) },
  image: {
    objectFit: 'fill',
    borderRadius: moderateScale(12),
    borderWidth: scale(1),
  },
});
