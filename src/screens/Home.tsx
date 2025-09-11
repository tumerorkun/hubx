import SearchBar from '@/components/SearchBar';
import { Text } from '@/components/Text';
import { moderateScale, scale, verticalScale } from '@/utils/responsive';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetCategoriesQuery, useGetQuestionsQuery } from '@/apis';
import PremiumButton from '@/components/PremiumButton';
import QuestionCard from '@/components/QuestionCard';
import CategoryCard from '@/components/CategoryCard';
import { useTheme } from '@/styles/theme';
import { ReactNode, useEffect, useMemo } from 'react';

export default function Home() {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const tabHeight = useBottomTabBarHeight();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const { data: questions, isLoading: isQuestionsLoading } =
    useGetQuestionsQuery();

  const categoryCards = useMemo(() => {
    if (!categories?.data) return null;

    let list = [] as ReactNode[];
    for (let i = 0, l = categories.data.length; i < l; i += 2) {
      const categoryLeft = categories.data[i];
      const categoryRight = categories.data[i + 1];
      if (categoryLeft || categoryRight) {
        list.push(
          <View
            key={`${categoryLeft.id} - ${categoryRight?.id}`}
            style={styles.categoryRow}
          >
            {categoryLeft ? (
              <CategoryCard key={categoryLeft.id} data={categoryLeft} />
            ) : null}
            {categoryRight ? (
              <CategoryCard key={categoryRight.id} data={categoryRight} />
            ) : null}
          </View>,
        );
      }
    }

    return list;
  }, [categories]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        id="head_bar"
        style={[
          styles.headerContainer,
          {
            paddingTop: top + verticalScale(3),
            borderBottomColor: colors.searchBarBorder,
          },
        ]}
        source={require('@assets/images/home_header_background.png')}
      >
        <View style={{ paddingLeft: moderateScale(24), gap: verticalScale(6) }}>
          <Text font="rubikRegular" size="h6">
            Hi, plant lover!
          </Text>
          <Text font="rubikMedium" size="h3">
            Good Afternoon! ⛅
          </Text>
        </View>

        <View
          style={{
            paddingTop: verticalScale(14),
            paddingHorizontal: scale(24),
          }}
        >
          <SearchBar />
        </View>
      </ImageBackground>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: tabHeight + verticalScale(24),
          paddingTop: verticalScale(24),
          gap: verticalScale(24),
        }}
      >
        <View style={{ paddingHorizontal: scale(24) }}>
          <PremiumButton />
        </View>
        {isQuestionsLoading ? null : (
          <View id="get_started" style={{ gap: verticalScale(16) }}>
            <View
              id="get_started_header"
              style={{ paddingHorizontal: scale(24), gap: verticalScale(16) }}
            >
              <Text font="rubikMedium" size="h7">
                Get Started
              </Text>
            </View>
            <ScrollView
              horizontal
              style={{ flex: 1 }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.questionsContainer}
            >
              {questions?.map(question => (
                <QuestionCard key={question.id} data={question} />
              ))}
            </ScrollView>
          </View>
        )}
        {isCategoriesLoading ? null : (
          <View id="categories" style={styles.categoriesContainer}>
            {categoryCards}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    paddingBottom: verticalScale(14),
    position: 'relative',
    borderWidth: moderateScale(0.2),
  },
  questionsContainer: { paddingHorizontal: scale(24), gap: scale(10) },
  categoriesContainer: {
    paddingHorizontal: scale(24),
    gap: verticalScale(10),
  },
  categoryRow: {
    flex: 1,
    alignContent: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: scale(10),
  },
});
