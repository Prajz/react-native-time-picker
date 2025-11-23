import { StyleSheet } from 'react-native';
import { TimePickerColors, defaultColors } from '../types/colors';

const ITEM_HEIGHT = 50;

export function generateStyles(customColors?: TimePickerColors) {
  const colors = { ...defaultColors, ...customColors };

  return StyleSheet.create({
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgroundColor,
    },
    pickerLabelContainer: {
      position: 'absolute',
      right: 4,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      minWidth: 25 * 0.65,
    },
    pickerLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 25 / 6,
      color: colors.textColor,
    },
    pickerItemContainer: {
      flexDirection: 'row',
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      width: 25 * 3.6,
    },
    pickerItem: {
      textAlignVertical: 'center',
      fontSize: 25,
      color: colors.textColor,
    },
    pickerItemSelected: {
      fontWeight: '600',
      color: colors.selectedTextColor,
    },
    pickerItemUnselected: {
      color: colors.unselectedTextColor,
    },
    disabledPickerContainer: {
      opacity: 0.4,
    },
    disabledPickerItem: {
      opacity: 0.2,
    },
    pickerGradientOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    durationScrollFlatList: {
      minWidth: 1,
      width: '300%',
    },
    durationScrollFlatListContainer: {
      overflow: 'visible',
    },
    durationScrollFlatListContentContainer: {},
    // Modal styles
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
      backgroundColor: colors.modalBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      paddingBottom: 40,
      maxHeight: '70%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textColor,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmButton: {
      backgroundColor: colors.buttonBackgroundColor,
    },
    cancelButton: {
      backgroundColor: colors.backgroundColor,
      borderWidth: 1,
      borderColor: colors.unselectedTextColor,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    confirmButtonText: {
      color: colors.buttonTextColor,
    },
    cancelButtonText: {
      color: colors.textColor,
    },
  });
}

export { ITEM_HEIGHT };

