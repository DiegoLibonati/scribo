import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";

import type { RenderAPI } from "@testing-library/react-native";
import type { NavBarProps } from "@/types/props";

import NavBar from "@/components/NavBar/NavBar";

import { createTestStore } from "@tests/__mocks__/store.mock";

const mockNavigate = jest.fn();

jest.mock("expo-router", (): { useRouter: () => { navigate: jest.Mock } } => ({
  useRouter: (): { navigate: jest.Mock } => ({ navigate: mockNavigate }),
}));

const renderComponent = (props: Partial<NavBarProps> = {}): RenderAPI => {
  const defaultProps: NavBarProps = {
    goBack: false,
    filter: false,
    ...props,
  };
  return render(
    <Provider store={createTestStore()}>
      <NavBar {...defaultProps} />
    </Provider>
  );
};

describe("NavBar", () => {
  describe("rendering", () => {
    it("should render the navbar title", () => {
      renderComponent();
      expect(screen.getByText("Notes App")).toBeTruthy();
    });

    it("should render the go back button when goBack is true", () => {
      renderComponent({ goBack: true });
      expect(screen.getByTestId("go-back")).toBeTruthy();
    });

    it("should not render the go back button when goBack is false", () => {
      renderComponent({ goBack: false });
      expect(screen.queryByTestId("go-back")).toBeNull();
    });

    it("should render the filter button when filter is true", () => {
      renderComponent({ filter: true });
      expect(screen.getByTestId("open-filters")).toBeTruthy();
    });

    it("should not render the filter button when filter is false", () => {
      renderComponent({ filter: false });
      expect(screen.queryByTestId("open-filters")).toBeNull();
    });
  });

  describe("behavior", () => {
    it("should navigate to home when the go back button is pressed", () => {
      renderComponent({ goBack: true });
      fireEvent.press(screen.getByTestId("go-back"));
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should navigate exactly once when the go back button is pressed", () => {
      renderComponent({ goBack: true });
      fireEvent.press(screen.getByTestId("go-back"));
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it("should open the filter modal in the store when the filter button is pressed", () => {
      const store = createTestStore();
      render(
        <Provider store={store}>
          <NavBar goBack={false} filter={true} />
        </Provider>
      );
      fireEvent.press(screen.getByTestId("open-filters"));
      expect(store.getState().ui.modal.isOpen).toBe(true);
    });
  });
});
