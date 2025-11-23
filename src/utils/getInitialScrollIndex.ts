/**
 * Calculates the initial scroll index for a number picker based on the desired value and configuration.
 * Handles both infinite and non-infinite scroll modes, taking into account padding and repetition.
 */
export function getInitialScrollIndex(variables: {
  disableInfiniteScroll: boolean;
  interval: number;
  numberOfItems: number;
  padWithNItems: number;
  repeatNumbersNTimes: number;
  value: number;
}): number {
  const {
    disableInfiniteScroll,
    interval,
    numberOfItems,
    padWithNItems,
    repeatNumbersNTimes,
    value,
  } = variables;

  return Math.max(
    numberOfItems * Math.floor(repeatNumbersNTimes / 2) +
      ((value / interval + numberOfItems) % numberOfItems) -
      (!disableInfiniteScroll ? padWithNItems : 0),
    0
  );
}

