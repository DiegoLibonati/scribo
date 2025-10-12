import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Note } from "@src/components/Note/Note";

import { useNotesStore } from "@src/hooks/useNotesStore";

import { theme } from "@src/styles/theme";

export const NotesList = () => {
  const { notes, notesFiltered, isFiltering } = useNotesStore();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {!notes.length && !isFiltering && (
        <Text style={styles.notFoundNotes}>
          You still don't have notes created.
        </Text>
      )}

      {isFiltering && !notesFiltered.length ? (
        <Text style={styles.notFoundNotes}>No notes found.</Text>
      ) : (
        <FlatList
          numColumns={2}
          data={notesFiltered.length ? notesFiltered : notes}
          renderItem={({ item }) => (
            <Note
              key={item.id}
              id={item.id}
              date={item.date}
              title={item.title}
              content={item.content}
            ></Note>
          )}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  notFoundNotes: {
    textAlign: "center",
    fontSize: 15,
    color: theme.colors.white,
  },
});
