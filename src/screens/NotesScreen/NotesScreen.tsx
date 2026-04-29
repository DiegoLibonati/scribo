import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import type { JSX } from "react";

import NavBar from "@/components/NavBar/NavBar";
import Search from "@/components/Search/Search";
import NotesList from "@/components/NotesList/NotesList";
import DialogFilter from "@/components/DialogFilter/DialogFilter";

import { theme } from "@/styles/theme";

const NotesScreen = (): JSX.Element => {
  const router = useRouter();

  const handlePressCreateNewNote = (): void => {
    router.navigate("/new");
  };

  return (
    <View style={styles.container}>
      <NavBar filter={true} goBack={false}></NavBar>
      <Search></Search>
      <NotesList></NotesList>
      <DialogFilter></DialogFilter>

      <TouchableOpacity
        style={styles.new}
        onPress={handlePressCreateNewNote}
        testID="create-new-note"
      >
        <Ionicons name="pencil" size={30} color={theme.colors.dark.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.white,
  },
  new: {
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

export default NotesScreen;
