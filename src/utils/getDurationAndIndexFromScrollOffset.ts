/**
 * Calculates the duration value and index from a scroll offset in a number picker.
 * Handles both infinite and non-infinite scroll modes, taking into account padding and item height.
 */
export function getDurationAndIndexFromScrollOffset(variables: {
  disableInfiniteScroll: boolean;
  interval: number;
  itemHeight: number;
  numberOfItems: number;
  padWithNItems: number;
  yContentOffset: number;
}): { duration: number; index: number } {
  const {
    disableInfiniteScroll,
    interval,
    itemHeight,
    numberOfItems,
    padWithNItems,
    yContentOffset,
  } = variables;

  const index = Math.round(yContentOffset / itemHeight);
  const duration =
    ((disableInfiniteScroll ? index : index + padWithNItems) %
      numberOfItems) *
    interval;

  return {
    duration,
    index,
  };
}

