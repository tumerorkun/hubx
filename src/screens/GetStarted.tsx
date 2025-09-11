import { Text } from '@/components/Text';
import { scale, verticalScale } from '@/utils/responsive';
import { useTheme } from '@/styles/theme';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function GetStarted() {
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={[styles.container, { paddingTop: top + verticalScale(12) }]}
      source={require('@assets/images/getstarted_background.png')}
    >
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text
            font="rubikRegular"
            numberOfLines={1}
            size="h1"
            style={{ color: colors.text }}
          >
            Welcome to
            <Text font="rubikLight" style={{ color: colors.text }}>
              {' '}
            </Text>
            <Text font="rubikSemiBold" style={{ color: colors.text }}>
              PlantApp
            </Text>
          </Text>
          <Text
            font="rubikRegular"
            size="h6"
            style={[styles.infoText, { color: colors.text }]}
          >
            Identify more than 3000+ plants and 88% accuracy.
          </Text>
        </View>
      </View>

      <ImageBackground
        style={styles.container}
        source={require('@assets/images/getstarted_content.png')}
      />

      <View
        style={[styles.bottomContainer, { bottom: bottom + verticalScale(8) }]}
      >
        <Button
          text="Get Started"
          onPress={() => {
            navigation.navigate('Onboarding');
          }}
        />
        <View>
          <Text
            font="rubikRegular"
            size="p3"
            style={[styles.bottomInfoText, { color: colors.thirdText }]}
          >
            By tapping next, you are agreeing to PlantID
          </Text>
          <Text
            font="rubikRegular"
            size="p3"
            style={[styles.bottomInfoText, , { color: colors.thirdText }]}
          >
            <Text style={styles.underline} onPress={() => {}}>
              Terms of Use
            </Text>{' '}
            &{' '}
            <Text style={styles.underline} onPress={() => {}}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  underline: { textDecorationLine: 'underline' },
  headerContainer: { paddingLeft: scale(24) },
  header: { gap: verticalScale(8), width: scale(300) },
  infoText: { opacity: 0.7 },
  bottomContainer: { paddingHorizontal: scale(24), gap: verticalScale(17) },
  bottomInfoText: { opacity: 0.7, textAlign: 'center' },
});
