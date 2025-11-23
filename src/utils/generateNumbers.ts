import { padNumber } from './padNumber';

/**
 * Generates an array of formatted numbers for a number picker, with support for infinite scroll,
 * padding, and number repetition.
 */
export function generateNumbers(
  numberOfItems: number,
  options: {
    disableInfiniteScroll?: boolean;
    interval: number;
    padNumbersWithZero?: boolean;
    padWithNItems: number;
    repeatNTimes: number;
  }
): string[] {
  if (numberOfItems <= 0) {
    return [];
  }

  let numbers: string[] = [];
  for (let i = 0; i < numberOfItems; i++) {
    const value = i * options.interval;
    numbers.push(
      padNumber(value, { padWithZero: options.padNumbersWithZero })
    );
  }

  if (options.repeatNTimes > 1) {
    numbers = Array(options.repeatNTimes).fill(numbers).flat();
  }

  if (options.disableInfiniteScroll || options.repeatNTimes === 1) {
    numbers.push(...Array(options.padWithNItems).fill(''));
    numbers.unshift(...Array(options.padWithNItems).fill(''));
  }

  return numbers;
}

