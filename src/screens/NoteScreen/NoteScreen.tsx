import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import type { JSX } from "react";
import type { Note } from "@/types/app";

import NavBar from "@/components/NavBar/NavBar";
import NoteComplete from "@/components/NoteComplete/NoteComplete";

import { useNotesStore } from "@/hooks/useNotesStore";

import { theme } from "@/styles/theme";

const NoteScreen = (): JSX.Element => {
  const [note, setNote] = useState<Note | null>(null);

  const { notes, handleRemoveNote } = useNotesStore();

  const { id: idNote } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const handlePressRemoveNote = (idNote: string): void => {
    handleRemoveNote(idNote);
    router.navigate("/");
  };

  useEffect(() => {
    if (!idNote) return;

    const found = notes.find((n) => n.id === idNote);

    if (!found) {
      router.navigate("/");
      return;
    }

    setNote(found);
  }, [idNote, notes, router]);

  return (
    <View style={styles.container}>
      <NavBar goBack={true} filter={false}></NavBar>

      <NoteComplete
        title={note?.title ?? ""}
        content={note?.content ?? ""}
        date={note?.date ?? ""}
      ></NoteComplete>

      <TouchableOpacity
        style={styles.remove}
        testID={`remove-note-${note?.id ?? ""}`}
        onPress={() => {
          if (note?.id) handlePressRemoveNote(note.id);
        }}
      >
        <Ionicons name="close" size={30} color={theme.colors.light.text.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.light.background.screen,
  },
  remove: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 50,
    elevation: 1,
    backgroundColor: theme.colors.light.primary,
    padding: 10,
    fontSize: 25,
  },
});

export default NoteScreen;
