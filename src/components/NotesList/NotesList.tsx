import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";

import { Note } from "../Note/Note";

import { useNotesStore } from "../../hooks/useNotesStore";
import { theme } from "../../theme/theme";

export const NotesList = (): JSX.Element => {
  const { notes, notesFiltered, isFiltering } = useNotesStore();

  return (
    <SafeAreaView style={styles.container}>
      {!notes.length && !isFiltering && (
        <Text style={styles.notFoundNotes}>You still don't have notes created.</Text>
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
