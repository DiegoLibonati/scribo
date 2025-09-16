import { StyleSheet, ScrollView, Text } from "react-native";

import { theme } from "@src/theme/theme";

interface NoteCompleteProps {
  date: string;
  title: string;
  content: string;
}

export const NoteComplete = ({ date, title, content }: NoteCompleteProps) => {
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
  date: { alignSelf: "flex-end", color: theme.colors.white },
  title: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 5,
    fontSize: 25,
    color: theme.colors.white,
  },
  content: { marginTop: 5, fontSize: 15, color: theme.colors.white },
});
