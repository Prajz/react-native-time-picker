import React, { useMemo, useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import TimePickerWheel from './TimePickerWheel';
import { TimePickerProps } from '../types';
import { generateStyles } from '../styles/pickerStyles';
import { getSafeInitialValue } from '../utils/getSafeInitialValue';

const TimePicker: React.FC<TimePickerProps> = ({
  initialValue,
  onTimeChange,
  minuteStep = 1,
  colors,
  isDisabled = false,
}) => {
  const styles = useMemo(() => generateStyles(colors), [colors]);
  const safeInitialValue = useMemo(
    () => getSafeInitialValue(initialValue),
    [initialValue]
  );

  const [selectedHours, setSelectedHours] = useState(safeInitialValue.hours);
  const [selectedMinutes, setSelectedMinutes] = useState(safeInitialValue.minutes);

  const hoursWheelRef = useRef<{
    reset: (options?: { animated?: boolean }) => void;
    setValue: (value: number, options?: { animated?: boolean }) => void;
    latestDuration: React.MutableRefObject<number>;
  } | null>(null);

  const minutesWheelRef = useRef<{
    reset: (options?: { animated?: boolean }) => void;
    setValue: (value: number, options?: { animated?: boolean }) => void;
    latestDuration: React.MutableRefObject<number>;
  } | null>(null);

  useEffect(() => {
    onTimeChange({
      hours: selectedHours,
      minutes: selectedMinutes,
    });
  }, [selectedHours, selectedMinutes, onTimeChange]);

  // Generate minute options based on minuteStep
  const minuteOptions = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => i).filter(
      (m) => m % minuteStep === 0
    );
  }, [minuteStep]);

  // Find the closest valid minute if current minute doesn't match step
  const getValidMinute = (min: number): number => {
    if (minuteOptions.includes(min)) return min;
    const closest = minuteOptions.reduce((prev, curr) =>
      Math.abs(curr - min) < Math.abs(prev - min) ? curr : prev
    );
    return closest;
  };

  const validMinutes = useMemo(
    () => getValidMinute(safeInitialValue.minutes),
    [safeInitialValue.minutes, minuteStep]
  );

  useEffect(() => {
    setSelectedMinutes(validMinutes);
  }, [validMinutes]);

  return (
    <View style={styles.pickerContainer} testID="timer-picker">
      <TimePickerWheel
        ref={hoursWheelRef}
        initialValue={safeInitialValue.hours}
        maximumValue={23}
        interval={1}
        onValueChange={setSelectedHours}
        padNumbersWithZero={true}
        padWithNItems={1}
        disableInfiniteScroll={false}
        isDisabled={isDisabled}
        colors={colors}
      />
      <Text style={{ fontSize: 25, marginHorizontal: 8, color: colors?.textColor || '#000000' }}>
        :
      </Text>
      <TimePickerWheel
        ref={minutesWheelRef}
        initialValue={validMinutes}
        maximumValue={59}
        interval={minuteStep}
        onValueChange={setSelectedMinutes}
        padNumbersWithZero={true}
        padWithNItems={1}
        disableInfiniteScroll={false}
        isDisabled={isDisabled}
        colors={colors}
      />
    </View>
  );
};

export default React.memo(TimePicker);

