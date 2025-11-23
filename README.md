# @prjd/react-native-time-picker

iOS-inspired time picker for React Native with infinite scrolling and customizable colors.

## Features

- 🎨 iOS-inspired modern, clean design
- ♾️ Infinite scrolling
- 🎨 Customizable colors
- ⚡ High performance with FlatList virtualization
- 📱 Works on both iOS and Android

## Installation

```bash
npm install @praj/react-native-time-picker
```

## Usage

```tsx
import { TimePickerModal } from "@praj/react-native-time-picker";

<TimePickerModal
  visible={visible}
  setIsVisible={setIsVisible}
  onConfirm={(time) => {
    console.log("Selected time:", time);
  }}
  initialValue={{ hours: 12, minutes: 30 }}
  minuteStep={5}
  colors={{
    primaryColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  }}
/>;
```

## Props

### TimePickerModal

- `visible`: boolean - Whether the modal is visible
- `setIsVisible`: (visible: boolean) => void - Function to control visibility
- `onConfirm`: (time: { hours: number; minutes: number }) => void - Callback when time is confirmed
- `onCancel?: () => void` - Callback when modal is cancelled
- `initialValue`: { hours: number; minutes: number } - Initial time value
- `minuteStep?: number` - Minute interval (default: 1)
- `colors?: TimePickerColors` - Custom color scheme
- `modalTitle?: string` - Title for the modal
- `closeOnOverlayPress?: boolean` - Close modal on overlay press (default: true)

## License

MIT
