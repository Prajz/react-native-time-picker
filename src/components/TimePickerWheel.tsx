import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { generateNumbers } from '../utils/generateNumbers';
import { getDurationAndIndexFromScrollOffset } from '../utils/getDurationAndIndexFromScrollOffset';
import { getInitialScrollIndex } from '../utils/getInitialScrollIndex';
import { getAdjustedLimit } from '../utils/getAdjustedLimit';
import { colorToRgba } from '../utils/colorToRgba';
import { TimePickerWheelProps } from '../types';
import { generateStyles, ITEM_HEIGHT } from '../styles/pickerStyles';

const keyExtractor = (_item: string, index: number) => index.toString();

const TimePickerWheel = forwardRef<
  {
    reset: (options?: { animated?: boolean }) => void;
    setValue: (value: number, options?: { animated?: boolean }) => void;
    latestDuration: React.MutableRefObject<number>;
  },
  TimePickerWheelProps
>((props, ref) => {
  const {
    initialValue = 0,
    interval,
    maximumValue,
    onValueChange,
    padWithNItems = 1,
    disableInfiniteScroll = false,
    padNumbersWithZero = false,
    limit,
    isDisabled = false,
    colors,
    styles: customStyles,
  } = props;

  const styles = useMemo(() => generateStyles(colors), [colors]);
  const pickerStyles = useMemo(
    () => ({
      ...styles,
      ...customStyles,
    }),
    [styles, customStyles]
  );

  const numberOfItems = useMemo(() => {
    if (maximumValue < 0) {
      return 1;
    }
    return Math.floor(maximumValue / interval) + 1;
  }, [interval, maximumValue]);

  const safeRepeatNumbersNTimes = useMemo(() => {
    if (numberOfItems === 1) {
      return 1;
    }
    if (!disableInfiniteScroll && 3 < 2) {
      return 2;
    } else if (3 < 1 || isNaN(3)) {
      return 1;
    }
    // Calculate reasonable value based on number of items
    return Math.max(Math.round(180 / numberOfItems), 1);
  }, [disableInfiniteScroll, numberOfItems]);

  const numbersForFlatList = useMemo(
    () =>
      generateNumbers(numberOfItems, {
        padNumbersWithZero,
        repeatNTimes: safeRepeatNumbersNTimes,
        disableInfiniteScroll,
        padWithNItems,
        interval,
      }),
    [
      disableInfiniteScroll,
      interval,
      numberOfItems,
      padNumbersWithZero,
      padWithNItems,
      safeRepeatNumbersNTimes,
    ]
  );

  const initialScrollIndex = useMemo(
    () =>
      getInitialScrollIndex({
        disableInfiniteScroll,
        interval,
        numberOfItems,
        padWithNItems,
        repeatNumbersNTimes: safeRepeatNumbersNTimes,
        value: initialValue,
      }),
    [
      disableInfiniteScroll,
      initialValue,
      interval,
      numberOfItems,
      padWithNItems,
      safeRepeatNumbersNTimes,
    ]
  );

  const adjustedLimit = useMemo(
    () => getAdjustedLimit(limit, numberOfItems, interval),
    [interval, limit, numberOfItems]
  );

  const numberOfItemsToShow = 1 + padWithNItems * 2;

  const latestDuration = useRef(initialValue);
  const lastFeedbackIndex = useRef(0);
  const flatListRef = useRef<FlatList<string> | null>(null);
  const [flatListRenderKey, setFlatListRenderKey] = useState(0);
  const initialRender = useRef(true);

  const aggressivelyGetLatestDuration = true;

  const onScroll = useCallback(
    (e: any) => {
      if (!aggressivelyGetLatestDuration) {
        return;
      }

      const newValues = getDurationAndIndexFromScrollOffset({
        disableInfiniteScroll,
        interval,
        itemHeight: pickerStyles.pickerItemContainer.height,
        numberOfItems,
        padWithNItems,
        yContentOffset: e.nativeEvent.contentOffset.y,
      });

      if (newValues.duration !== latestDuration.current) {
        // check limits
        if (newValues.duration > adjustedLimit.max) {
          newValues.duration = adjustedLimit.max;
        } else if (newValues.duration < adjustedLimit.min) {
          newValues.duration = adjustedLimit.min;
        }
        latestDuration.current = newValues.duration;
      }
    },
    [
      adjustedLimit.max,
      adjustedLimit.min,
      aggressivelyGetLatestDuration,
      disableInfiniteScroll,
      interval,
      numberOfItems,
      padWithNItems,
      pickerStyles.pickerItemContainer.height,
    ]
  );

  const onMomentumScrollEnd = useCallback(
    (e: any) => {
      const newValues = getDurationAndIndexFromScrollOffset({
        disableInfiniteScroll,
        interval,
        itemHeight: pickerStyles.pickerItemContainer.height,
        numberOfItems,
        padWithNItems,
        yContentOffset: e.nativeEvent.contentOffset.y,
      });

      // check limits
      if (newValues.duration > adjustedLimit.max) {
        const targetScrollIndex =
          newValues.index - (newValues.duration - adjustedLimit.max);
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: targetScrollIndex >= 0 ? targetScrollIndex : adjustedLimit.max - 1,
        });
        newValues.duration = adjustedLimit.max;
      } else if (newValues.duration < adjustedLimit.min) {
        const targetScrollIndex =
          newValues.index + (adjustedLimit.min - newValues.duration);
        flatListRef.current?.scrollToIndex({
          animated: true,
          index:
            targetScrollIndex <= numbersForFlatList.length - 1
              ? targetScrollIndex
              : adjustedLimit.min,
        });
        newValues.duration = adjustedLimit.min;
      }
      onValueChange(newValues.duration);
    },
    [
      disableInfiniteScroll,
      interval,
      pickerStyles.pickerItemContainer.height,
      numberOfItems,
      padWithNItems,
      adjustedLimit.max,
      adjustedLimit.min,
      onValueChange,
      numbersForFlatList.length,
    ]
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (numberOfItems === 1) {
        return;
      }
      if (
        viewableItems[0]?.index &&
        viewableItems[0].index < numberOfItems * 0.5
      ) {
        flatListRef.current?.scrollToIndex({
          animated: false,
          index: viewableItems[0].index + numberOfItems,
        });
      } else if (
        viewableItems[0]?.index &&
        viewableItems[0].index >=
          numberOfItems * (safeRepeatNumbersNTimes - 0.5)
      ) {
        flatListRef.current?.scrollToIndex({
          animated: false,
          index: viewableItems[0].index - numberOfItems,
        });
      }
    },
    [numberOfItems, safeRepeatNumbersNTimes]
  );

  const [viewabilityConfigCallbackPairs, setViewabilityConfigCallbackPairs] =
    useState(
      !disableInfiniteScroll
        ? [
            {
              viewabilityConfig: {
                viewAreaCoveragePercentThreshold: 0,
              },
              onViewableItemsChanged,
            },
          ]
        : undefined
    );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setFlatListRenderKey((prev) => prev + 1);
    setViewabilityConfigCallbackPairs(
      !disableInfiniteScroll
        ? [
            {
              viewabilityConfig: {
                viewAreaCoveragePercentThreshold: 0,
              },
              onViewableItemsChanged,
            },
          ]
        : undefined
    );
  }, [disableInfiniteScroll, onViewableItemsChanged]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: pickerStyles.pickerItemContainer.height,
      offset: pickerStyles.pickerItemContainer.height * index,
      index,
    }),
    [pickerStyles.pickerItemContainer.height]
  );

  useImperativeHandle(
    ref,
    () => ({
      reset: (options) => {
        flatListRef.current?.scrollToIndex({
          animated: options?.animated ?? false,
          index: initialScrollIndex,
        });
      },
      setValue: (value, options) => {
        flatListRef.current?.scrollToIndex({
          animated: options?.animated ?? false,
          index: getInitialScrollIndex({
            disableInfiniteScroll,
            interval,
            numberOfItems,
            padWithNItems,
            repeatNumbersNTimes: safeRepeatNumbersNTimes,
            value,
          }),
        });
      },
      latestDuration,
    }),
    [
      disableInfiniteScroll,
      initialScrollIndex,
      interval,
      numberOfItems,
      padWithNItems,
      safeRepeatNumbersNTimes,
    ]
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const intItem = parseInt(item);
      const isDisabledItem =
        intItem > adjustedLimit.max || intItem < adjustedLimit.min;

      // Determine if this is the selected item (middle of visible area)
      // This is a simplified check - in a real implementation, we'd track scroll position
      const isSelected = false; // Will be determined by scroll position

      return (
        <View
          style={pickerStyles.pickerItemContainer}
          testID="picker-item"
        >
          <Text
            style={[
              pickerStyles.pickerItem,
              isSelected
                ? pickerStyles.pickerItemSelected
                : pickerStyles.pickerItemUnselected,
              isDisabledItem && pickerStyles.disabledPickerItem,
            ]}
          >
            {item}
          </Text>
        </View>
      );
    },
    [
      adjustedLimit.max,
      adjustedLimit.min,
      pickerStyles.pickerItem,
      pickerStyles.pickerItemContainer,
      pickerStyles.pickerItemSelected,
      pickerStyles.pickerItemUnselected,
      pickerStyles.disabledPickerItem,
    ]
  );

  const renderLinearGradient = useMemo(() => {
    const backgroundColor =
      pickerStyles.pickerContainer.backgroundColor ?? '#FFFFFF';
    const transparentBackgroundColor = colorToRgba(backgroundColor, 0);

    const gradientHeight =
      padWithNItems > 0 ? 1 / (padWithNItems * 2 + 1) : 0.3;

    return (
      <LinearGradient
        colors={[
          backgroundColor,
          transparentBackgroundColor,
          transparentBackgroundColor,
          backgroundColor,
        ]}
        locations={[0, gradientHeight, 1 - gradientHeight, 1]}
        pointerEvents="none"
        style={pickerStyles.pickerGradientOverlay}
      />
    );
  }, [padWithNItems, pickerStyles.pickerContainer.backgroundColor, pickerStyles.pickerGradientOverlay]);

  const snapToOffsets = useMemo(
    () =>
      [...Array(numbersForFlatList.length)].map(
        (_, i) => i * pickerStyles.pickerItemContainer.height
      ),
    [numbersForFlatList.length, pickerStyles.pickerItemContainer.height]
  );

  return (
    <View
      pointerEvents={isDisabled ? 'none' : undefined}
      style={[
        pickerStyles.durationScrollFlatListContainer,
        {
          height: pickerStyles.pickerItemContainer.height * numberOfItemsToShow,
        },
        isDisabled && pickerStyles.disabledPickerContainer,
      ]}
    >
      <FlatList
        key={flatListRenderKey}
        ref={flatListRef}
        contentContainerStyle={
          pickerStyles.durationScrollFlatListContentContainer
        }
        data={numbersForFlatList}
        decelerationRate={0.88}
        getItemLayout={getItemLayout}
        initialScrollIndex={initialScrollIndex}
        keyExtractor={keyExtractor}
        nestedScrollEnabled={true}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={onScroll}
        renderItem={renderItem}
        scrollEnabled={!isDisabled}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        snapToOffsets={snapToOffsets}
        style={pickerStyles.durationScrollFlatList}
        testID="duration-scroll-flatlist"
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        windowSize={numberOfItemsToShow}
      />
      {renderLinearGradient}
    </View>
  );
});

TimePickerWheel.displayName = 'TimePickerWheel';

export default React.memo(TimePickerWheel);

