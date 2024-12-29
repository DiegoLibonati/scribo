import { View, Pressable, Text, StyleSheet } from "react-native";

import { theme } from "../../theme/theme";

interface CheckboxProps {
  id: string;
  name: string;
  active: boolean;
  onPress: (name: string) => void;
}

export const Checkbox = ({
  id,
  name,
  active,
  onPress,
}: CheckboxProps): JSX.Element => {
  return (
    <View style={styles.checkboxContainer} testID="checkbox-root">
      <Pressable
        style={[
          styles.checkbox,
          {
            backgroundColor: active
              ? theme.colors.secondary
              : theme.colors.white,
          },
        ]}
        onPress={() => onPress(id)}
        testID={`pressable-${id}`}
      ></Pressable>
      <Text style={styles.checkboxText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 50,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 20,
    color: theme.colors.white,
  },
});
