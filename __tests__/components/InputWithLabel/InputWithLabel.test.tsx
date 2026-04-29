import { render, screen, fireEvent } from "@testing-library/react-native";

import type { RenderAPI } from "@testing-library/react-native";
import type { InputWithLabelProps } from "@/types/props";

import InputWithLabel from "@/components/InputWithLabel/InputWithLabel";

const mockOnChangeText = jest.fn();

const renderComponent = (props: Partial<InputWithLabelProps> = {}): RenderAPI => {
  const defaultProps: InputWithLabelProps = {
    label: "Title",
    placeholder: "Enter title...",
    value: "",
    onChangeText: mockOnChangeText,
    ...props,
  };
  return render(<InputWithLabel {...defaultProps} />);
};

describe("InputWithLabel", () => {
  describe("rendering", () => {
    it("should render the label text", () => {
      renderComponent();
      expect(screen.getByText("Title")).toBeTruthy();
    });

    it("should render the input with the provided placeholder", () => {
      renderComponent();
      expect(screen.getByPlaceholderText("Enter title...")).toBeTruthy();
    });

    it("should render the current value in the input", () => {
      renderComponent({ value: "My Note Title" });
      expect(screen.getByDisplayValue("My Note Title")).toBeTruthy();
    });

    it("should render the input with a testID based on the label", () => {
      renderComponent({ label: "Content" });
      expect(screen.getByTestId("input-Content")).toBeTruthy();
    });
  });

  describe("behavior", () => {
    it("should call onChangeText with the typed text", () => {
      renderComponent();
      fireEvent.changeText(screen.getByPlaceholderText("Enter title..."), "Hello World");
      expect(mockOnChangeText).toHaveBeenCalledWith("Hello World");
    });

    it("should call onChangeText exactly once per change event", () => {
      renderComponent();
      fireEvent.changeText(screen.getByPlaceholderText("Enter title..."), "test");
      expect(mockOnChangeText).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("should render without the optional inputHeight prop", () => {
      renderComponent({ inputHeight: undefined! });
      expect(screen.getByPlaceholderText("Enter title...")).toBeTruthy();
    });

    it("should render with a numeric inputHeight", () => {
      renderComponent({ inputHeight: 120 });
      expect(screen.getByPlaceholderText("Enter title...")).toBeTruthy();
    });

    it("should render without the optional placeholderTextColor prop", () => {
      renderComponent({ placeholderTextColor: undefined! });
      expect(screen.getByPlaceholderText("Enter title...")).toBeTruthy();
    });
  });
});
