import { render, fireEvent } from "@testing-library/react-native";

import { DimensionValue } from "react-native";

import { GlobalTest } from "../../../entities/entities";

import { InputWithLabel } from "../InputWithLabel";

import { theme } from "../../../theme/theme";

type RenderComponent = {
  props: {
    label: string;
    placeholder: string;
    value: string;
    inputHeight?: DimensionValue;
    placeholderTextColor?: string;
    mockOnChangeText: jest.Mock;
  };
} & GlobalTest;

const renderComponent = (): RenderComponent => {
  const props = {
    label: "label",
    placeholder: "placeholder",
    value: "",
    inputHeight: 45,
    placeholderTextColor: "red",
    mockOnChangeText: jest.fn(),
  };

  const { debug, getByText, getByRole, getByTestId } = render(
    <InputWithLabel
      label={props.label}
      inputHeight={props.inputHeight}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      onChangeText={props.mockOnChangeText}
    ></InputWithLabel>
  );

  return {
    props: props,
    debug: debug,
    gets: {
      getByText: getByText,
      getByRole: getByRole,
      getByTestId: getByTestId,
    },
  };
};

test("It must render the label and the input.", () => {
  const { props, gets } = renderComponent();

  const label = gets?.getByText!(props.label);
  const input = gets?.getByTestId!(`input-${props.label}`);

  expect(label).toBeTruthy();
  expect(input).toBeTruthy();
});

test("It must render the input with the height entered by props.", () => {
  const { props, gets } = renderComponent();

  const input = gets?.getByTestId!(`input-${props.label}`);

  expect(input).toBeTruthy();
  expect(input).toHaveStyle({ height: props.inputHeight });
});

test("It must execute the onChangeText function when the value of the input is changed.", () => {
  const { props, gets } = renderComponent();

  const input = gets?.getByTestId!(`input-${props.label}`);

  fireEvent.changeText(input);

  expect(props.mockOnChangeText).toHaveBeenCalledTimes(1);
});

test("It should render the placeholder and the placeholder color entered by props.", () => {
  const { props, gets } = renderComponent();

  const input = gets?.getByTestId!(`input-${props.label}`);

  expect(input.props.placeholder).toEqual(props.placeholder);
  expect(input.props.placeholderTextColor).toEqual(props.placeholderTextColor);
});
