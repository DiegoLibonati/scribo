import type { DimensionValue } from "react-native";

// interface DefaultProps {
//   children?: React.ReactNode;
// }

export interface CheckboxProps {
  id: string;
  name: string;
  active: boolean;
  onPress: (name: string) => void;
}

export interface InputWithLabelProps {
  label: string;
  placeholder: string;
  value: string;
  inputHeight?: DimensionValue;
  placeholderTextColor?: string;
  onChangeText: (text: string) => void;
}

export interface NavBarProps {
  goBack: boolean;
  filter: boolean;
}

export interface NoteProps {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface NoteCompleteProps {
  date: string;
  title: string;
  content: string;
}
