import { render, screen, fireEvent } from "@testing-library/react-native";

import type { RenderAPI } from "@testing-library/react-native";
import type { CheckboxProps } from "@/types/props";

import Checkbox from "@/components/Checkbox/Checkbox";

const mockOnPress = jest.fn();

const renderComponent = (props: Partial<CheckboxProps> = {}): RenderAPI => {
  const defaultProps: CheckboxProps = {
    id: "checkbox-1",
    name: "My Checkbox",
    active: false,
    onPress: mockOnPress,
    ...props,
  };
  return render(<Checkbox {...defaultProps} />);
};

describe("Checkbox", () => {
  describe("rendering", () => {
    it("should render the checkbox name", () => {
      renderComponent();
      expect(screen.getByText("My Checkbox")).toBeTruthy();
    });

    it("should render with a custom name", () => {
      renderComponent({ name: "Custom Label" });
      expect(screen.getByText("Custom Label")).toBeTruthy();
    });

    it("should render the root container", () => {
      renderComponent();
      expect(screen.getByTestId("checkbox-root")).toBeTruthy();
    });

    it("should render the pressable with the testID based on the id prop", () => {
      renderComponent({ id: "filter-date" });
      expect(screen.getByTestId("pressable-filter-date")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should call onPress with the checkbox id when pressed", () => {
      renderComponent({ id: "checkbox-1" });
      fireEvent.press(screen.getByTestId("pressable-checkbox-1"));
      expect(mockOnPress).toHaveBeenCalledWith("checkbox-1");
    });

    it("should call onPress exactly once when pressed", () => {
      renderComponent();
      fireEvent.press(screen.getByTestId("pressable-checkbox-1"));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });
});
