import { StyleSheet, Text, View, Modal, Pressable } from "react-native";

import { Filter } from "../../entities/entities";

import { Checkbox } from "../Checkbox/Checkbox";

import { useUiStore } from "../../hooks/useUiStore";
import { useNotesStore } from "../../hooks/useNotesStore";

import { theme } from "../../theme/theme";

export const DialogFilter = (): JSX.Element => {
  const { filters, handleFilterChange } = useNotesStore();
  const { modal, handleCloseModal } = useUiStore();

  const handlePressCheckbox = (id: string): void => {
    handleFilterChange(id);
  };

  const handlePressCloseModal = (): void => {
    handleCloseModal();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modal.isOpen}
      testID="dialog-filter"
    >
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={styles.textModal}>Filter by</Text>
          {filters.map((filter: Filter) => {
            return (
              <Checkbox
                key={filter.id}
                id={filter.id}
                name={filter.name}
                active={filter.isActive}
                onPress={handlePressCheckbox}
              ></Checkbox>
            );
          })}
          <Pressable
            onPress={handlePressCloseModal}
            style={styles.buttonModal}
            testID="pressable-close-dialog"
          >
            <Text style={styles.textButtonModal}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `rgba(${theme.colors.blackInt}, 0.5)`,
  },
  modal: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "75%",
    height: "40%",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  textModal: {
    fontSize: 25,
    color: theme.colors.white,
  },
  buttonModal: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 5,
    right: 5,
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 10,
  },
  textButtonModal: {
    color: theme.colors.white,
  },
});
