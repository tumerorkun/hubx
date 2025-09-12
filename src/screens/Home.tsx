import { Fragment, ReactNode, useCallback, useMemo } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetCategoriesQuery, useGetQuestionsQuery } from '@/apis';
import SearchBar from '@/components/SearchBar';
import { Text } from '@/components/Text';
import { moderateScale, scale, verticalScale } from '@/utils/responsive';
import PremiumButton from '@/components/PremiumButton';
import QuestionCard from '@/components/QuestionCard';
import CategoryCard from '@/components/CategoryCard';
import { useTheme } from '@/styles/theme';
import { Question } from '@/apis/types';

const layoutParts = {
  premium: () => (
    <View style={{ paddingHorizontal: scale(24) }}>
      <PremiumButton />
    </View>
  ),
  questions: () => <QuestionList />,
  categories: () => <CategoryList />,
};

const QuestionList = () => {
  const { data: questions, isLoading: isQuestionsLoading } =
    useGetQuestionsQuery();

  const renderItem = useCallback(
    ({ item: question }: { item: Question }) => (
      <QuestionCard key={question.id} data={question} />
    ),
    [],
  );

  if (isQuestionsLoading) {
    return null; // loading visual or prefetched query
  }

  return (
    <View id="get_started" style={{ gap: verticalScale(16) }}>
      <View
        id="get_started_header"
        style={{ paddingHorizontal: scale(24), gap: verticalScale(16) }}
      >
        <Text font="rubikMedium" size="h7">
          Get Started
        </Text>
      </View>
      <FlatList
        horizontal
        style={{ flex: 1 }}
        data={questions}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.questionsContainer}
      />
    </View>
  );
};

const CategoryList = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  type categoryRow = { key: string; render: ReactNode };

  const categoryCards = useMemo(() => {
    if (!categories?.data) return null;

    let list = [] as categoryRow[];
    /**
     * make it possible to use flex:1 in CategoryCard
     */
    for (let i = 0, l = categories.data.length; i < l; i += 2) {
      const categoryLeft = categories.data[i];
      const categoryRight = categories.data[i + 1];
      if (categoryLeft || categoryRight) {
        list.push({
          key: `${categoryLeft.id} - ${categoryRight?.id}`,
          render: (
            <Fragment key={`${categoryLeft.id} - ${categoryRight?.id}`}>
              {categoryLeft ? (
                <CategoryCard key={categoryLeft.id} data={categoryLeft} />
              ) : null}

              {categoryRight ? (
                <CategoryCard key={categoryRight.id} data={categoryRight} />
              ) : (
                <View style={styles.container} />
              )}
            </Fragment>
          ),
        });
      }
    }

    return list;
  }, [categories]);

  const renderItem = useCallback(
    ({ item: row }: { item: categoryRow }) => (
      <View style={styles.categoryRow} key={row.key}>
        {row.render}
      </View>
    ),
    [],
  );

  if (isCategoriesLoading) {
    return null; // loading visual or prefetched query
  }

  // this is for dummy data so has no pagination etc...
  return (
    <FlatList
      id="categories"
      style={styles.categoriesContainer}
      data={categoryCards}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default function Home() {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const tabHeight = useBottomTabBarHeight();

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

        <View style={styles.searchContainer}>
          <SearchBar />
        </View>
      </ImageBackground>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: tabHeight + verticalScale(24),
          paddingTop: verticalScale(24),
          gap: verticalScale(24),
        }}
        data={Object.keys(layoutParts) as Array<keyof typeof layoutParts>}
        renderItem={({ item }) => layoutParts[item]()}
      />
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
  searchContainer: {
    paddingTop: verticalScale(14),
    paddingHorizontal: scale(24),
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
