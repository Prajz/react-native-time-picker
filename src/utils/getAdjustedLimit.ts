/**
 * Adjusts and validates the min/max limits for a scrollable number picker.
 * Ensures limits are within valid bounds and handles edge cases.
 */
export function getAdjustedLimit(
  limit: { min?: number; max?: number } | undefined,
  numberOfItems: number,
  interval: number
): { max: number; min: number } {
  const maxValue = (numberOfItems - 1) * interval;

  if (!limit || (limit.max === undefined && limit.min === undefined)) {
    return {
      max: maxValue,
      min: 0,
    };
  }

  // guard against limits that are out of bounds
  const adjustedMaxLimit =
    limit.max !== undefined ? Math.min(limit.max, maxValue) : maxValue;
  const adjustedMinLimit = limit.min !== undefined ? Math.max(limit.min, 0) : 0;

  // guard against invalid limits
  if (adjustedMaxLimit < adjustedMinLimit) {
    return {
      max: maxValue,
      min: 0,
    };
  }

  return {
    max: adjustedMaxLimit,
    min: adjustedMinLimit,
  };
}

