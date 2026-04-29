import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";

import type { RenderAPI } from "@testing-library/react-native";
import type { RootState } from "@/app/store";

import DialogFilter from "@/components/DialogFilter/DialogFilter";

import { createTestStore } from "@tests/__mocks__/store.mock";

const renderComponent = (preloadedState?: Partial<RootState>): RenderAPI =>
  render(
    <Provider store={createTestStore(preloadedState)}>
      <DialogFilter />
    </Provider>
  );

describe("DialogFilter", () => {
  describe("rendering", () => {
    it("should render the Filter by heading when the modal is open", () => {
      renderComponent({ ui: { modal: { isOpen: true } } });
      expect(screen.getByText("Filter by")).toBeTruthy();
    });

    it("should render all filter options when the modal is open", () => {
      renderComponent({ ui: { modal: { isOpen: true } } });
      expect(screen.getByText("Date")).toBeTruthy();
      expect(screen.getByText("Title")).toBeTruthy();
      expect(screen.getByText("Description")).toBeTruthy();
    });

    it("should render the close button when the modal is open", () => {
      renderComponent({ ui: { modal: { isOpen: true } } });
      expect(screen.getByText("Close")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should close the modal in the store when the close button is pressed", () => {
      const store = createTestStore({ ui: { modal: { isOpen: true } } });
      render(
        <Provider store={store}>
          <DialogFilter />
        </Provider>
      );
      fireEvent.press(screen.getByTestId("pressable-close-dialog"));
      expect(store.getState().ui.modal.isOpen).toBe(false);
    });

    it("should activate the selected filter when a checkbox is pressed", () => {
      const store = createTestStore({ ui: { modal: { isOpen: true } } });
      render(
        <Provider store={store}>
          <DialogFilter />
        </Provider>
      );
      fireEvent.press(screen.getByTestId("pressable-title"));
      expect(store.getState().notes.filters.find((f) => f.id === "title")?.isActive).toBe(true);
    });

    it("should deactivate the previously active filter when a new one is selected", () => {
      const store = createTestStore({ ui: { modal: { isOpen: true } } });
      render(
        <Provider store={store}>
          <DialogFilter />
        </Provider>
      );
      fireEvent.press(screen.getByTestId("pressable-title"));
      expect(store.getState().notes.filters.find((f) => f.id === "date")?.isActive).toBe(false);
    });
  });
});
