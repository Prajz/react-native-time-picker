import * as ExpoHaptics from "expo-haptics";

/**
 * Fires a selection haptic feedback pulse using the iOS Taptic Engine.
 * This matches the subtle tick felt when scrolling through a native iOS picker.
 * Silently no-ops on devices that don't support haptics.
 */
export function triggerSelectionHaptic(): void {
  try {
    // selectionAsync is specifically designed for selection-changed events
    // (e.g. scrolling through a picker) — lighter and more intentional than impactAsync
    ExpoHaptics.selectionAsync();
  } catch {
    // Silently swallow errors on devices without haptic support
  }
}
