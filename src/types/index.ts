import { TimePickerColors } from './colors';

export type { TimePickerColors };

export interface TimeValue {
  hours: number;
  minutes: number;
}

export interface TimePickerWheelProps {
  initialValue: number;
  maximumValue: number;
  interval: number;
  onValueChange: (value: number) => void;
  itemHeight?: number;
  padWithNItems?: number;
  disableInfiniteScroll?: boolean;
  padNumbersWithZero?: boolean;
  limit?: { min?: number; max?: number };
  isDisabled?: boolean;
  colors?: TimePickerColors;
  styles?: {
    pickerItemContainer?: any;
    pickerItem?: any;
    pickerContainer?: any;
    pickerGradientOverlay?: any;
  };
}

export interface TimePickerProps {
  initialValue: TimeValue;
  onTimeChange: (time: TimeValue) => void;
  minuteStep?: number;
  colors?: TimePickerColors;
  isDisabled?: boolean;
}

export interface TimePickerModalProps {
  visible: boolean;
  setIsVisible: (visible: boolean) => void;
  onConfirm: (time: TimeValue) => void;
  onCancel?: () => void;
  initialValue: TimeValue;
  minuteStep?: number;
  colors?: TimePickerColors;
  modalTitle?: string;
  closeOnOverlayPress?: boolean;
}

