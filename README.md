# @prjd/react-native-time-picker

iOS-inspired time picker for React Native with infinite scrolling, customizable colors, and optional haptic feedback.

## Features

- 🎨 iOS-inspired modern, clean design
- ♾️ Infinite scrolling wheels
- 🎨 Fully customizable colors with a single `primaryColor` accent or per-field overrides
- 📳 Optional haptic feedback on scroll (via `expo-haptics`)
- ⚡ High performance with FlatList virtualization
- 📱 Works on iOS and Android

## Installation

```bash
bun add @prjd/react-native-time-picker
```

---


## Usage

```tsx
import { TimePickerModal } from "@prjd/react-native-time-picker";

const [visible, setVisible] = useState(false);

<TimePickerModal
  visible={visible}
  setIsVisible={setVisible}
  onConfirm={(time) => console.log(time.hours, time.minutes)}
  onCancel={() => setVisible(false)}
  initialValue={{ hours: 12, minutes: 30 }}
  minuteStep={5}
  modalTitle="Select time"
  hapticFeedback
  colors={{
    primaryColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  }}
/>
```

### Using the picker without the modal

```tsx
import { TimePicker } from "@prjd/react-native-time-picker";

<TimePicker
  initialValue={{ hours: 8, minutes: 0 }}
  onTimeChange={(time) => console.log(time)}
  minuteStep={15}
  hapticFeedback
/>
```

---

## Props

### `TimePickerModal`

| Prop | Type | Default | Description |
|---|---|---|---|
| `visible` | `boolean` | — | Whether the modal is visible |
| `setIsVisible` | `(visible: boolean) => void` | — | Controls modal visibility |
| `onConfirm` | `(time: TimeValue) => void` | — | Called when the user taps Confirm |
| `onCancel` | `() => void` | — | Called when the user taps Cancel |
| `initialValue` | `TimeValue` | — | Initial `{ hours, minutes }` |
| `minuteStep` | `number` | `1` | Interval between minute values |
| `colors` | `TimePickerColors` | see below | Custom color scheme |
| `modalTitle` | `string` | — | Title shown at the top of the sheet |
| `closeOnOverlayPress` | `boolean` | `true` | Dismiss on backdrop tap |
| `hapticFeedback` | `boolean` | `false` | Trigger haptics when scrolling between values |

### `TimePicker`

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialValue` | `TimeValue` | — | Initial `{ hours, minutes }` |
| `onTimeChange` | `(time: TimeValue) => void` | — | Called on every value change |
| `minuteStep` | `number` | `1` | Interval between minute values |
| `colors` | `TimePickerColors` | see below | Custom color scheme |
| `isDisabled` | `boolean` | `false` | Disables interaction |
| `hapticFeedback` | `boolean` | `false` | Trigger haptics when scrolling between values |

---

## Colors

All color fields are optional. Any field you omit falls back to the default iOS-inspired light theme.

| Field | Default | Description |
|---|---|---|
| `primaryColor` | `#007AFF` | Accent shorthand — drives `buttonBackgroundColor` and `selectedTextColor` when those are not set explicitly |
| `textColor` | `#000000` | General text (title, cancel button, picker items) |
| `selectedTextColor` | `#000000` | Highlighted (centre) picker item. Falls back to `primaryColor` |
| `unselectedTextColor` | `#999999` | Dimmed picker items and cancel button border |
| `backgroundColor` | `#FFFFFF` | Picker background and cancel button background |
| `modalBackgroundColor` | `#FFFFFF` | Modal sheet background |
| `buttonBackgroundColor` | `#007AFF` | Confirm button background. Falls back to `primaryColor` |
| `buttonTextColor` | `#FFFFFF` | Confirm button text |

### Single accent color

Set just `primaryColor` to theme the most visible accent areas in one go:

```tsx
colors={{ primaryColor: "#a78bfa" }}
```

### Full custom palette

```tsx
colors={{
  primaryColor: "#a78bfa",       // fallback for button + selected text
  buttonBackgroundColor: "#7c3aed", // overrides primaryColor for the button
  buttonTextColor: "#fff",
  textColor: "#111827",
  selectedTextColor: "#111827",
  unselectedTextColor: "#6b7280",
  backgroundColor: "#f9fafb",
  modalBackgroundColor: "#ffffff",
}}
```

---

## Types

```tsx
interface TimeValue {
  hours: number;   // 0–23
  minutes: number; // 0–59
}
```

---

## License

MIT