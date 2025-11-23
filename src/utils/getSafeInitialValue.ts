/**
 * Safely extracts and validates initial time values, ensuring all values are valid numbers.
 * Returns a time object with safe default values (0) for any invalid or missing inputs.
 */
export function getSafeInitialValue(initialValue?: {
  hours?: number;
  minutes?: number;
}): { hours: number; minutes: number } {
  return {
    hours:
      typeof initialValue?.hours === 'number' && !isNaN(initialValue.hours)
        ? initialValue.hours
        : 0,
    minutes:
      typeof initialValue?.minutes === 'number' && !isNaN(initialValue.minutes)
        ? initialValue.minutes
        : 0,
  };
}

