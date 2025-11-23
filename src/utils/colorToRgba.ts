/**
 * Converts a color string to rgba format with a custom opacity.
 * Handles hex colors (#RRGGBB, #RGB) and rgb/rgba colors.
 */
export function colorToRgba(
  color: string,
  opacity: number
): string {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r =
      hex.length === 3
        ? parseInt(hex[0] + hex[0], 16)
        : parseInt(hex.slice(0, 2), 16);
    const g =
      hex.length === 3
        ? parseInt(hex[1] + hex[1], 16)
        : parseInt(hex.slice(2, 4), 16);
    const b =
      hex.length === 3
        ? parseInt(hex[2] + hex[2], 16)
        : parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Handle rgb/rgba colors
  const rgbMatch = color.match(/\d+/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    const r = parseInt(rgbMatch[0], 10);
    const g = parseInt(rgbMatch[1], 10);
    const b = parseInt(rgbMatch[2], 10);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Fallback to black with opacity
  return `rgba(0, 0, 0, ${opacity})`;
}

