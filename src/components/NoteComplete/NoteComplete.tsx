import { StyleSheet, ScrollView, Text } from "react-native";

import type { JSX } from "react";
import type { NoteCompleteProps } from "@/types/props";

import { theme } from "@/styles/theme";

const NoteComplete = ({ date, title, content }: NoteCompleteProps): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.date}>{date}</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, paddingVertical: 5 },
  date: { alignSelf: "flex-end", color: theme.colors.light.text.primary },
  title: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 5,
    fontSize: 25,
    color: theme.colors.light.text.primary,
  },
  content: { marginTop: 5, fontSize: 15, color: theme.colors.light.text.primary },
});

export default NoteComplete;
