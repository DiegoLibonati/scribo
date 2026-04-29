import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { useRouter } from "expo-router";

import type { JSX } from "react";
import type { NoteProps } from "@/types/props";

import { theme } from "@/styles/theme";

const Note = ({ id, date, title, content }: NoteProps): JSX.Element => {
  const router = useRouter();

  const handlePressNote = (): void => {
    router.navigate(`/${id}`);
  };

  return (
    <TouchableNativeFeedback onPress={handlePressNote} testID={`note-${id}`}>
      <View style={styles.container}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.content} numberOfLines={5}>
          {content}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light.background.card,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    height: 200,
  },
  date: {
    alignSelf: "flex-end",
    fontSize: 10,
    color: theme.colors.light.text.primary,
  },
  title: {
    alignSelf: "center",
    fontSize: 21,
    textAlign: "center",
    color: theme.colors.light.text.primary,
  },
  content: {
    fontSize: 14,
    marginTop: 8,
    color: theme.colors.light.text.primary,
  },
});

export default Note;
