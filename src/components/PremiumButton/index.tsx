import { moderateScale, scale, verticalScale } from '@/utils/responsive';
import {
  Canvas,
  Paragraph,
  Skia,
  TextAlign,
  TileMode,
  useFonts,
  vec,
} from '@shopify/react-native-skia';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { CaretIcon } from '@/components/Icons';
import { memo, useMemo } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useTheme } from '@/styles/theme';

function PremiumButton() {
  const { colors } = useTheme();
  const size = useSharedValue({ width: 0, height: 0 });
  const customFontMgr = useFonts({
    SFPro: [
      require('@assets/fonts/SFProText-Regular.otf'),
      require('@assets/fonts/SFProText-Bold.otf'),
      require('@assets/fonts/SFProText-Semibold.otf'),
    ],
  });

  const paragraph = useMemo(() => {
    if (!customFontMgr) return null;
    const foregroundPaint = Skia.Paint();
    foregroundPaint.setShader(
      Skia.Shader.MakeLinearGradient(
        vec(0, 0),
        vec(scale(183), 0),
        [
          Skia.Color(colors.premiumTitleGradientStart),
          Skia.Color(colors.premiumTitleGradientEnd),
        ],
        [0.4935, 1.3092],
        TileMode.Clamp,
      ),
    );
    const paragraphStyle = { textAlign: TextAlign.Left };
    const textStyle = {
      fontFamilies: ['SFPro'],
      fontSize: moderateScale(16),
      lineHeight: verticalScale(21),
      letterSpacing: moderateScale(-0.32),
    };
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle({ ...textStyle, fontStyle: { weight: 700 } }, foregroundPaint)
      .addText('FREE ')
      .pushStyle({ ...textStyle, fontStyle: { weight: 600 } }, foregroundPaint)
      .addText('Premium Available')
      .pop()
      .build();
  }, [customFontMgr]);

  const paragraph2 = useMemo(() => {
    if (!customFontMgr) return null;
    const foregroundPaint = Skia.Paint();
    foregroundPaint.setShader(
      Skia.Shader.MakeLinearGradient(
        vec(0, 0),
        vec(scale(183) * 0.49, 0),
        [
          Skia.Color(colors.premiumInfoGradientStart),
          Skia.Color(colors.premiumInfoGradientEnd),
        ],
        [0.4935, 1.12],
        TileMode.Clamp,
      ),
    );
    const paragraphStyle = { textAlign: TextAlign.Left };
    const textStyle = {
      fontFamilies: ['SFPro'],
      fontSize: moderateScale(13),
      lineHeight: verticalScale(16),
      letterSpacing: moderateScale(-0.32),
    };
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle({ ...textStyle, fontStyle: { weight: 400 } }, foregroundPaint)
      .addText('Tap to upgrade your account! ')
      .pop()
      .build();
  }, [customFontMgr]);

  return (
    <Pressable
      id="premium_button"
      style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.7 : 1 }]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: colors.premiumButtonBackground },
        ]}
      >
        <Image
          id="envelope"
          source={require('@assets/images/premium_envelope.png')}
          width={104}
          height={89}
          style={styles.envelopeContainer}
        />
        <Canvas style={styles.canvas} onSize={size}>
          <Paragraph paragraph={paragraph} x={0} y={0} width={scale(183)} />
          <Paragraph
            paragraph={paragraph2}
            x={0}
            y={verticalScale(21)}
            width={scale(183)}
          />
        </Canvas>
        <CaretIcon />
      </View>
    </Pressable>
  );
}
export default memo(PremiumButton);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(64),
    borderRadius: moderateScale(12),
    paddingLeft: scale(20),
    paddingRight: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  envelopeContainer: {
    width: scale(52),
    height: scale(44.5),
    marginTop: scale(7.5),
    marginLeft: scale(-8),
  },
  canvas: {
    flex: 1,
    height: verticalScale(38),
    paddingLeft: scale(10),
    pointerEvents: 'none',
  },
});
