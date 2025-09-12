import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/styles/theme';
import { moderateScale, scale, verticalScale } from '@/utils/responsive';

type Props = {
  icon?: ReactNode;
  title?: ReactNode;
  info?: ReactNode;
  shadowActive?: boolean;
};

export default function PaywallFeatureCard({
  icon,
  title,
  info,
  shadowActive,
}: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.paywallFeatureCardBackground,
          boxShadow: shadowActive
            ? `0px 4px 4px 0px ${colors.black25}`
            : undefined,
        },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.black25 }]}>
        {icon}
      </View>
      <View>
        {title}
        {info}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(156),
    height: verticalScale(130),
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
