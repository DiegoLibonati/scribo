import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";

import type { RenderAPI } from "@testing-library/react-native";

import Search from "@/components/Search/Search";

import { createTestStore } from "@tests/__mocks__/store.mock";

const renderComponent = (): RenderAPI =>
  render(
    <Provider store={createTestStore()}>
      <Search />
    </Provider>
  );

describe("Search", () => {
  describe("rendering", () => {
    it("should render the search input", () => {
      renderComponent();
      expect(screen.getByTestId("search-input")).toBeTruthy();
    });

    it("should render with the placeholder text", () => {
      renderComponent();
      expect(screen.getByPlaceholderText("Search note...")).toBeTruthy();
    });

    it("should render with an empty initial value", () => {
      renderComponent();
      expect(screen.getByDisplayValue("")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should update the input value when text is typed", () => {
      renderComponent();
      fireEvent.changeText(screen.getByTestId("search-input"), "my note");
      expect(screen.getByDisplayValue("my note")).toBeTruthy();
    });

    it("should set isFiltering to true in the store when a search term is entered", () => {
      const store = createTestStore();
      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
      fireEvent.changeText(screen.getByTestId("search-input"), "note");
      expect(store.getState().notes.isFiltering).toBe(true);
    });

    it("should set isFiltering to false in the store when the search input is cleared", () => {
      const store = createTestStore();
      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
      fireEvent.changeText(screen.getByTestId("search-input"), "note");
      fireEvent.changeText(screen.getByTestId("search-input"), "");
      expect(store.getState().notes.isFiltering).toBe(false);
    });
  });
});
