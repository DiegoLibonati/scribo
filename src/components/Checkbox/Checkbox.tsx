import { View, Pressable, Text, StyleSheet } from "react-native";

import type { JSX } from "react";
import type { CheckboxProps } from "@/types/props";

import { theme } from "@/styles/theme";

const Checkbox = ({ id, name, active, onPress }: CheckboxProps): JSX.Element => {
  return (
    <View style={styles.checkboxContainer} testID="checkbox-root">
      <Pressable
        style={[
          styles.checkbox,
          {
            backgroundColor: active ? theme.colors.light.primary : theme.colors.dark.primary,
          },
        ]}
        onPress={() => {
          onPress(id);
        }}
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
    backgroundColor: theme.colors.dark.primary,
    borderColor: theme.colors.light.secondary,
    borderWidth: 1,
    borderRadius: 50,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 20,
    color: theme.colors.dark.primary,
  },
});

export default Checkbox;
