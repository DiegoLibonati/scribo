import { render, fireEvent } from "@testing-library/react-native";

import { Provider } from "react-redux";

import { GlobalTest } from "@src/entities/tests";

import { DialogFilter } from "@src/components/DialogFilter/DialogFilter";

import { useUiStore } from "@src/hooks/useUiStore";
import { useNotesStore } from "@src/hooks/useNotesStore";
import { store } from "@src/app/store";
import { theme } from "@src/styles/theme";

type RenderComponent = {} & GlobalTest;

const renderComponent = (): RenderComponent => {
  const {
    debug,
    getByText,
    getByRole,
    getByTestId,
    getAllByTestId,
    queryByTestId,
  } = render(
    <Provider store={store}>
      <DialogFilter />
    </Provider>
  );

  return {
    debug: debug,
    gets: {
      getByText: getByText,
      getByRole: getByRole,
      getByTestId: getByTestId,
      getAllByTestId: getAllByTestId,
    },
    querys: {
      queryByTestId: queryByTestId,
    },
  };
};

jest.mock("@src/hooks/useUiStore", () => ({
  ...jest.requireActual("@src/hooks/useUiStore"),
  useUiStore: jest.fn(),
}));
jest.mock("@src/hooks/useNotesStore", () => ({
  ...jest.requireActual("@src/hooks/useNotesStore"),
  useNotesStore: jest.fn(),
}));

describe("DialogFilter.tsx", () => {
  describe("If modal is open.", () => {
    const mockHandleFilterChange = jest.fn();
    const mockHandleCloseModal = jest.fn();

    const isOpenModal = true;
    const filters = [
      { id: "q", name: "Q", isActive: true },
      { id: "q2", name: "Q2", isActive: false },
    ];

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        modal: { isOpen: isOpenModal },
        handleCloseModal: mockHandleCloseModal,
      });

      (useNotesStore as jest.Mock).mockReturnValue({
        filters: filters,
        handleFilterChange: mockHandleFilterChange,
      });
    });

    test("It must render the title of the Dialog.", () => {
      const { gets } = renderComponent();

      const title = gets?.getByText!("Filter by");

      expect(title).toBeTruthy();
    });

    test("It must render all of the filters. And there should only be a single asset. In addition, it must execute the relevant functions when the pressable is pressed.", () => {
      const { gets } = renderComponent();

      const activeFilters = filters.filter((filter) => filter.isActive);

      expect(activeFilters).toHaveLength(1);

      const activeFilter = activeFilters[0];

      const checkboxs = gets?.getAllByTestId!("checkbox-root");

      expect(checkboxs).toHaveLength(filters.length);

      const activePressable = gets?.getByTestId!(
        `pressable-${activeFilter.id}`
      );

      expect(activePressable).toBeTruthy();
      expect(activePressable).toHaveStyle({
        backgroundColor: theme.colors.secondary,
      });

      fireEvent.press(activePressable);

      expect(mockHandleFilterChange).toHaveBeenCalledTimes(1);
      expect(mockHandleFilterChange).toHaveBeenCalledWith(activeFilter.id);
    });

    test("It must render the pressable to close the dialog with your text. It must also execute the relevant functions when pressed.", () => {
      const { gets } = renderComponent();

      const closeDialogPressable = gets?.getByTestId!("pressable-close-dialog");
      const textDialogClose = gets?.getByText!("Close");

      expect(closeDialogPressable).toBeTruthy();
      expect(textDialogClose).toBeTruthy();

      fireEvent.press(closeDialogPressable);

      expect(mockHandleCloseModal).toHaveBeenCalledTimes(1);
    });
  });

  describe("If modal is close.", () => {
    const mockHandleFilterChange = jest.fn();
    const mockHandleCloseModal = jest.fn();

    const isOpenModal = false;
    const filters = [
      { id: "q", name: "Q", isActive: true },
      { id: "q2", name: "Q2", isActive: false },
    ];

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        modal: { isOpen: isOpenModal },
        handleCloseModal: mockHandleCloseModal,
      });

      (useNotesStore as jest.Mock).mockReturnValue({
        filters: filters,
        handleFilterChange: mockHandleFilterChange,
      });
    });

    test("It should not render the dialog", () => {
      const { querys } = renderComponent();

      const dialog = querys?.queryByTestId!("dialog-filter");

      expect(dialog).toBeFalsy();
    });
  });
});
