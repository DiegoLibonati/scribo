import { render, fireEvent } from "@testing-library/react-native";

import { GlobalTest } from "../../../entities/entities";

import { Checkbox } from "../Checkbox";

import { theme } from "../../../theme/theme";

type RenderComponent = {
  props: {
    id: string;
    name: string;
    active: boolean;
    onPress: jest.Mock;
  };
} & GlobalTest;

interface RenderComponentProps {
  active: boolean;
}

const renderComponent = ({ active }: RenderComponentProps): RenderComponent => {
  const props = {
    id: "1234",
    name: "12345",
    active: active,
    onPress: jest.fn(),
  };

  const { debug, getByText, getByRole, getByTestId } = render(
    <Checkbox
      id={props.id}
      name={props.name}
      active={props.active}
      onPress={props.onPress}
    ></Checkbox>
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

describe("If active is true.", () => {
  const active = true;

  test("It must render the pressable with the appropriate style.", () => {
    const { props, gets } = renderComponent({ active: active });

    const pressable = gets?.getByTestId!(`pressable-${props.id}`);

    expect(pressable).toBeTruthy();
    expect(pressable).toHaveStyle({ backgroundColor: theme.colors.secondary });
  });
});

describe("If active is false.", () => {
  const active = false;

  test("It must render the pressable with the appropriate style.", () => {
    const { props, gets } = renderComponent({ active: active });

    const pressable = gets?.getByTestId!(`pressable-${props.id}`);

    expect(pressable).toBeTruthy();
    expect(pressable).toHaveStyle({ backgroundColor: theme.colors.white });
  });
});

describe("General Tests.", () => {
  test("It must render the pressable and the text.", () => {
    const { props, gets } = renderComponent({ active: false });

    const pressable = gets?.getByTestId!(`pressable-${props.id}`);
    const text = gets?.getByText!(props.name);

    expect(pressable).toBeTruthy();
    expect(text).toBeTruthy();
  });

  test("It should run the onPress function when the pressable is clicked.", () => {
    const { props, gets } = renderComponent({ active: false });

    const pressable = gets?.getByTestId!(`pressable-${props.id}`);

    expect(pressable).toBeTruthy();

    fireEvent.press(pressable);

    expect(props.onPress).toHaveBeenCalledTimes(1);
    expect(props.onPress).toHaveBeenCalledWith(props.id);
  });
});
