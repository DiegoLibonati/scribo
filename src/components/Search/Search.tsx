import { useState, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import type { JSX } from "react";

import { useNotesStore } from "@/hooks/useNotesStore";

import { theme } from "@/styles/theme";

const Search = (): JSX.Element => {
  const { handleSetNotesFiltered } = useNotesStore();

  const [valueFilter, setValueFilter] = useState<string>("");

  useEffect(() => {
    handleSetNotesFiltered(valueFilter);
  }, [valueFilter]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search note..."
        onChangeText={setValueFilter}
        value={valueFilter}
        placeholderTextColor={theme.colors.light.text.primary}
        testID="search-input"
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 75,
  },
  searchInput: {
    width: "80%",
    padding: 10,
    borderRadius: 50,
    borderColor: theme.colors.light.border.default,
    borderWidth: 1,
    color: theme.colors.light.text.primary,
  },
});

export default Search;
