import { useState } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";

import type { JSX } from "react";
import type { Note } from "@/types/app";

import NavBar from "@/components/NavBar/NavBar";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";

import { useNotesStore } from "@/hooks/useNotesStore";

import { theme } from "@/styles/theme";

const CreateNoteScreen = (): JSX.Element => {
  const [formData, setFormData] = useState<Pick<Note, "title" | "content">>({
    title: "",
    content: "",
  });

  const { handleSetNewNote } = useNotesStore();

  const router = useRouter();

  const onInputChange = (key: string, value: string): void => {
    setFormData((state) => ({ ...state, [key]: value }));
  };

  const handleSubmit = (): void => {
    const title = formData.title.trim();
    const content = formData.content.trim();

    if (!title || !content) return;

    const note: Note = {
      id: String(new Date().getMilliseconds()),
      date: new Date().toLocaleString("default", {
        day: "2-digit",
        month: "long",
      }),
      title: formData.title,
      content: formData.content,
    };

    handleSetNewNote(note);
    router.navigate("/");
  };

  return (
    <View style={styles.container}>
      <NavBar goBack={true} filter={false}></NavBar>

      <View style={styles.form}>
        <InputWithLabel
          label="Insert a Title"
          placeholder="Title..."
          value={formData.title}
          placeholderTextColor={theme.colors.white}
          onChangeText={(text) => {
            onInputChange("title", text);
          }}
        ></InputWithLabel>

        <InputWithLabel
          label="Insert a Content"
          placeholder="Content..."
          value={formData.content}
          placeholderTextColor={theme.colors.white}
          onChangeText={(text) => {
            onInputChange("content", text);
          }}
        ></InputWithLabel>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} testID="create-note">
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
  },
  form: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 5,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: theme.colors.white,
  },
});

export default CreateNoteScreen;
