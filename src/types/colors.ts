/**
 * Color scheme for the time picker
 */
export interface TimePickerColors {
  /** Main accent color — drives buttonBackgroundColor and selectedTextColor when those are not explicitly set */
  primaryColor?: string;
  /** Text color for picker items and labels */
  textColor?: string;
  /** Color for the selected (centre) picker item. Falls back to primaryColor if not set */
  selectedTextColor?: string;
  /** Color for unselected/dimmed picker items */
  unselectedTextColor?: string;
  /** Background color of the picker wheel */
  backgroundColor?: string;
  /** Background color of the modal sheet */
  modalBackgroundColor?: string;
  /** Background color of the confirm button. Falls back to primaryColor if not set */
  buttonBackgroundColor?: string;
  /** Text color of the confirm button */
  buttonTextColor?: string;
}

/**
 * Default dark theme colors
 */
export const defaultColors: Required<TimePickerColors> = {
  primaryColor: "#007AFF",
  textColor: "#FFFFFF",
  selectedTextColor: "#FFFFFF",
  unselectedTextColor: "#555555",
  backgroundColor: "#000000",
  modalBackgroundColor: "#000000",
  buttonBackgroundColor: "#007AFF",
  buttonTextColor: "#FFFFFF",
};
