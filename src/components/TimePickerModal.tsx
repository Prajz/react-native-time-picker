import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import TimePicker from './TimePicker';
import { TimePickerModalProps, TimeValue } from '../types';
import { generateStyles } from '../styles/pickerStyles';
import { getSafeInitialValue } from '../utils/getSafeInitialValue';

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  setIsVisible,
  onConfirm,
  onCancel,
  initialValue,
  minuteStep = 1,
  colors,
  modalTitle,
  closeOnOverlayPress = true,
}) => {
  const styles = useMemo(() => generateStyles(colors), [colors]);
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const safeInitialValue = useMemo(
    () => getSafeInitialValue(initialValue),
    [initialValue]
  );

  const [selectedDuration, setSelectedDuration] =
    useState<TimeValue>(safeInitialValue);
  const [confirmedDuration, setConfirmedDuration] =
    useState<TimeValue>(safeInitialValue);

  const isMounted = useRef(false);
  const animatedOpacity = useRef(new Animated.Value(0));

  useEffect(() => {
    isMounted.current = true;
    if (visible) {
      show();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (visible) {
      show();
    } else {
      hide();
    }
  }, [visible]);

  useEffect(() => {
    setSelectedDuration(safeInitialValue);
    setConfirmedDuration(safeInitialValue);
  }, [safeInitialValue.hours, safeInitialValue.minutes]);

  const backdropAnimatedStyle = {
    opacity: animatedOpacity.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.4],
    }),
  };

  const contentAnimatedStyle = {
    transform: [
      {
        translateY: animatedOpacity.current.interpolate({
          inputRange: [0, 1],
          outputRange: [screenHeight, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const show = useCallback(() => {
    Animated.timing(animatedOpacity.current, {
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
      duration: 300,
      toValue: 1,
    }).start();
  }, []);

  const hide = useCallback(() => {
    Animated.timing(animatedOpacity.current, {
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
      duration: 300,
      toValue: 0,
    }).start(() => {
      if (isMounted.current) {
        setIsVisible(false);
      }
    });
  }, [setIsVisible]);

  const hideModalHandler = useCallback(() => {
    setSelectedDuration({
      hours: confirmedDuration.hours,
      minutes: confirmedDuration.minutes,
    });
    hide();
  }, [confirmedDuration, hide]);

  const confirmHandler = useCallback(() => {
    const newDuration = {
      hours: selectedDuration.hours,
      minutes: selectedDuration.minutes,
    };
    setConfirmedDuration(newDuration);
    onConfirm(newDuration);
    hide();
  }, [selectedDuration, onConfirm, hide]);

  const cancelHandler = useCallback(() => {
    hide();
    setSelectedDuration(confirmedDuration);
    onCancel?.();
  }, [confirmedDuration, hide, onCancel]);

  const durationChangeHandler = useCallback(
    (duration: TimeValue) => {
      setSelectedDuration(duration);
    },
    []
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      testID="timer-picker-modal"
    >
      <TouchableWithoutFeedback
        onPress={closeOnOverlayPress ? hideModalHandler : undefined}
        testID="modal-backdrop"
      >
        <Animated.View
          style={[
            styles.modalBackdrop,
            backdropAnimatedStyle,
            {
              width: screenWidth,
              height: screenHeight,
            },
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        pointerEvents="box-none"
        style={[styles.modalContent, contentAnimatedStyle]}
      >
        {modalTitle ? (
          <Text style={styles.modalTitle}>{modalTitle}</Text>
        ) : null}
        <TimePicker
          initialValue={confirmedDuration}
          onTimeChange={durationChangeHandler}
          minuteStep={minuteStep}
          colors={colors}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={cancelHandler}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={confirmHandler}
            style={[styles.button, styles.confirmButton]}
          >
            <Text style={[styles.buttonText, styles.confirmButtonText]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default React.memo(TimePickerModal);

