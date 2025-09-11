import { moderateScale, verticalScale, scale, width } from '@/utils/responsive';
import { StyleSheet, TextInput, View } from 'react-native';
import { SearchIcon } from '../Icons';
import { useTheme } from '@/styles/theme';

export default function SearchBar() {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.white88,
          borderColor: colors.searchBarBorder,
        },
      ]}
    >
      <SearchIcon />
      <TextInput
        placeholder="Search for plants"
        textAlignVertical="center"
        placeholderTextColor={colors.placeholderText}
        style={[styles.inputText, { color: colors.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(44),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(0.2),
    alignItems: 'center',
    paddingHorizontal: scale(16),
    overflow: 'hidden',
    gap: scale(12),
    flexDirection: 'row',
  },
  inputText: {
    fontSize: moderateScale(15.5),
    fontFamily: 'Rubik-Regular',
    flex: 1,
  },
});
