import { fireEvent, render } from "@testing-library/react-native";

import { Provider } from "react-redux";

import { GlobalTest } from "../../../entities/entities";

import { Search } from "../Search";

import { useNotesStore } from "../../../hooks/useNotesStore";
import { store } from "../../../slices/store";
import { theme } from "../../../theme/theme";

type RenderComponent = {} & GlobalTest;

jest.mock("../../../hooks/useNotesStore", () => ({
  ...jest.requireActual("../../../hooks/useNotesStore"),
  useNotesStore: jest.fn(),
}));

const mockHandleSetNotesFiltered = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  (useNotesStore as jest.Mock).mockReturnValue({
    handleSetNotesFiltered: mockHandleSetNotesFiltered,
  });
});

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
      <Search />
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

test("It must render the search input.", () => {
  const { gets } = renderComponent();

  const input = gets?.getByTestId!("search-input");

  expect(input).toBeTruthy();
  expect(input.props.value).toEqual("");
});

test("It must render the props entered in the input.", () => {
  const { gets } = renderComponent();

  const input = gets?.getByTestId!("search-input");

  expect(input.props.placeholder).toEqual("Search note...");
  expect(input.props.placeholderTextColor).toEqual(theme.colors.white);
});

test("It must execute the onChangeText function when text is entered.", () => {
  const value = "a";

  const { gets } = renderComponent();

  const input = gets?.getByTestId!("search-input");

  expect(input).toBeTruthy();
  expect(input.props.value).toEqual("");

  fireEvent.changeText(input, value);

  // FirstTime + insert letter a -> 2
  expect(mockHandleSetNotesFiltered).toHaveBeenCalledTimes(2);
  expect(mockHandleSetNotesFiltered).toHaveBeenCalledWith("");
  expect(mockHandleSetNotesFiltered).toHaveBeenCalledWith("a");
});
