import { moderateScale } from '@/utils/responsive';
import { TextProps, Text as NativeText } from 'react-native';

const fonts = {
  rubikLight: 'Rubik-Light',
  rubikRegular: 'Rubik-Regular',
  rubikMedium: 'Rubik-Medium',
  rubikBold: 'Rubik-Bold',
  rubikSemiBold: 'Rubik-SemiBold',
  rubikXBold: 'Rubik-ExtraBold',
  sfRegular: 'SFProText-Regular',
  sfBold: 'SFProText-Bold',
  sfSemiBold: 'SFProText-Semibold',
  visbyExtraBold: 'VisbyCF-ExtraBold',
} as const;

const sizes = {
  h0: {
    fontSize: moderateScale(30),
  },
  h1: {
    fontSize: moderateScale(28),
    letterSpacing: moderateScale(0.07),
  },
  h2: {
    fontSize: moderateScale(27),
  },
  h3: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(28),
    letterSpacing: moderateScale(0.35),
  },
  h4: {
    fontSize: moderateScale(20),
    lineHeight: moderateScale(24),
    letterSpacing: moderateScale(0.38),
  },
  h5: {
    fontSize: moderateScale(17),
    lineHeight: moderateScale(24),
    letterSpacing: moderateScale(0.38),
  },
  h6: {
    fontSize: moderateScale(16),
    letterSpacing: moderateScale(0.07),
    lineHeight: moderateScale(22),
  },
  h7: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(20),
    letterSpacing: moderateScale(-0.24),
  },
  p0: {
    fontSize: moderateScale(15.5),
  },
  p1: {
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
    letterSpacing: moderateScale(-0.08),
  },
  p2: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
  },
  p3: {
    fontSize: moderateScale(11),
    lineHeight: moderateScale(15),
    letterSpacing: moderateScale(0.07),
  },
  p4: { fontSize: moderateScale(9), lineHeight: moderateScale(9) * 1.32 },
  none: {},
};

type Props = TextProps & {
  font?: keyof typeof fonts;
  size?: Exclude<keyof typeof sizes, 'none'>;
};

export const Text = ({
  children,
  font = 'rubikRegular',
  style,
  size,
  ...others
}: Props) => {
  return (
    <NativeText
      {...others}
      style={[
        sizes[size ?? 'none'],
        style,
        { includeFontPadding: false, fontFamily: fonts[font] },
      ]}
      textBreakStrategy="highQuality"
      lineBreakStrategyIOS="push-out"
    >
      {children}
    </NativeText>
  );
};
