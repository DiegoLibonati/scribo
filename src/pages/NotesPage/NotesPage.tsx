import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import { NavBar } from "@src/components/NavBar/NavBar";
import { Search } from "@src/components/Search/Search";
import { NotesList } from "@src/components/NotesList/NotesList";
import { DialogFilter } from "@src/components/DialogFilter/DialogFilter";

import { theme } from "@src/theme/theme";

export const NotesPage = () => {
  const navigate = useNavigate();

  const handlePressCreateNewNote = () => {
    navigate("/new");
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
        <Ionicons name="pencil" size={30} color={theme.colors.white} />
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
  new: {
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
