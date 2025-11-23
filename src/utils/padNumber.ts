/**
 * Formats a number by optionally padding it with a leading zero or space.
 * Numbers less than 10 are padded based on the options provided.
 */
export function padNumber(
  value: number,
  options?: { padWithZero?: boolean }
): string {
  if (value < 10) {
    return (options?.padWithZero ? '0' : ' ') + value;
  } else {
    return String(value);
  }
}

