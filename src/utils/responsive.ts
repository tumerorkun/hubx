import { Dimensions, PixelRatio } from 'react-native';
import { GUIDELINE_BASE_WIDTH, GUIDELINE_BASE_HEIGHT } from '@/_constants';

export const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

export const bareScale = (size: number) =>
  (shortDimension / GUIDELINE_BASE_WIDTH) * size;
export const scale = (size: number) =>
  PixelRatio.roundToNearestPixel(bareScale(size));
export const bareVerticalScale = (size: number) =>
  (longDimension / GUIDELINE_BASE_HEIGHT) * size;
export const verticalScale = (size: number) =>
  PixelRatio.roundToNearestPixel(bareVerticalScale(size));
export const moderateScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (bareScale(size) - size) * factor);
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(
    size + (bareVerticalScale(size) - size) * factor,
  );
