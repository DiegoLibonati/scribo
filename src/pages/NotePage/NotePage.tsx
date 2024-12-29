import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";

import { Note } from "../../entities/entities";

import { NavBar } from "../../components/NavBar/NavBar";
import { NoteComplete } from "../../components/NoteComplete/NoteComplete";

import { useNotesStore } from "../../hooks/useNotesStore";
import { theme } from "../../theme/theme";

export const NotePage = (): JSX.Element => {
  const [note, setNote] = useState<Note | null>(null);

  const { notes, handleRemoveNote } = useNotesStore();

  const { idNote } = useParams();
  const navigate = useNavigate();

  const handlePressRemoveNote = (idNote: string) => {
    handleRemoveNote(idNote);
    navigate("/");
  };

  useEffect(() => {
    if (!idNote) return;

    const note = notes.find((note) => note.id === idNote)!;

    if (!note) return navigate("/");

    setNote(note);
  }, [idNote]);

  return (
    <View style={styles.container}>
      <NavBar goBack={true} filter={false}></NavBar>

      <NoteComplete
        title={note?.title!}
        content={note?.content!}
        date={note?.date!}
      ></NoteComplete>

      <TouchableOpacity
        style={styles.remove}
        testID={`remove-note-${note?.id!}`}
        onPress={() => handlePressRemoveNote(note?.id!)}
      >
        <Ionicons name="close" size={30} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
  },
  remove: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 50,
    elevation: 1,
    backgroundColor: theme.colors.secondary,
    padding: 10,
    fontSize: 25,
  },
});
