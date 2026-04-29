import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import type { JSX } from "react";
import type { NavBarProps } from "@/types/props";

import { useUiStore } from "@/hooks/useUiStore";

import { theme } from "@/styles/theme";

const NavBar = ({ goBack, filter }: NavBarProps): JSX.Element => {
  const { handleOpenModal } = useUiStore();
  const router = useRouter();

  const handlePressBack = (): void => {
    router.navigate("/");
  };

  const handlePressFilter = (): void => {
    handleOpenModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.navbarText}>Notes App</Text>
      <View style={styles.shadow} />

      {goBack && (
        <TouchableOpacity onPress={handlePressBack} style={styles.goBack} testID="go-back">
          <Ionicons name="arrow-back-outline" size={30} color={theme.colors.white} />
        </TouchableOpacity>
      )}

      {filter && (
        <TouchableOpacity onPress={handlePressFilter} style={styles.filter} testID="open-filters">
          <Ionicons name="filter" size={30} color={theme.colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    elevation: 5,
    overflow: "hidden",
  },
  navbarText: {
    fontSize: 21,
    fontWeight: "bold",
    color: theme.colors.white,
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1.5,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
    opacity: 0.2,
    zIndex: -1,
  },
  goBack: {
    position: "absolute",
    left: 5,
  },
  filter: {
    position: "absolute",
    right: 5,
  },
});

export default NavBar;
