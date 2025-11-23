/**
 * Color scheme for the time picker
 */
export interface TimePickerColors {
  /** Main accent color (for selected item, buttons) */
  primaryColor?: string;
  /** Text color for picker items */
  textColor?: string;
  /** Color for selected/middle item */
  selectedTextColor?: string;
  /** Color for unselected items */
  unselectedTextColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Modal background color */
  modalBackgroundColor?: string;
  /** Button background color */
  buttonBackgroundColor?: string;
  /** Button text color */
  buttonTextColor?: string;
}

/**
 * Default iOS-inspired colors
 */
export const defaultColors: Required<TimePickerColors> = {
  primaryColor: '#007AFF',
  textColor: '#000000',
  selectedTextColor: '#000000',
  unselectedTextColor: '#999999',
  backgroundColor: '#FFFFFF',
  modalBackgroundColor: '#FFFFFF',
  buttonBackgroundColor: '#007AFF',
  buttonTextColor: '#FFFFFF',
};

