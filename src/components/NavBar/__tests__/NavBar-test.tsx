import { render, fireEvent } from "@testing-library/react-native";

import { MemoryRouter } from "react-router-native";
import { Provider } from "react-redux";

import { GlobalTest } from "@src/entities/entities";

import { NavBar } from "@src/components/NavBar/NavBar";

import { useUiStore } from "@src/hooks/useUiStore";
import { store } from "@src/slices/store";

type RenderComponent = {} & GlobalTest;

interface RenderComponentProps {
  goBack: boolean;
  filter: boolean;
}

const renderComponent = ({
  goBack,
  filter,
}: RenderComponentProps): RenderComponent => {
  const {
    debug,
    getByText,
    getByRole,
    getByTestId,
    getAllByTestId,
    queryByTestId,
  } = render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <NavBar filter={filter} goBack={goBack} />
      </MemoryRouter>
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

describe("Navbar.tsx", () => {
  describe("If goBack is true.", () => {
    const mockHandleOpenModal = jest.fn();
    const goBack = true;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        handleOpenModal: mockHandleOpenModal,
      });
    });

    test("It must render the button to go back.", () => {
      const { gets } = renderComponent({ goBack: goBack, filter: false });

      const touchableGoBack = gets?.getByTestId!("go-back");

      expect(touchableGoBack).toBeTruthy();
    });
  });

  describe("If filter is true.", () => {
    const mockHandleOpenModal = jest.fn();
    const filter = true;

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        handleOpenModal: mockHandleOpenModal,
      });
    });

    test("It must render the button to open the filters modal and also when pressed it must execute the relevant functions.", () => {
      const { gets } = renderComponent({ goBack: false, filter: filter });

      const touchableFilters = gets?.getByTestId!("open-filters");

      expect(touchableFilters).toBeTruthy();

      fireEvent.press(touchableFilters);

      expect(mockHandleOpenModal).toHaveBeenCalledTimes(1);
    });
  });

  describe("General Tests.", () => {
    const mockHandleOpenModal = jest.fn();

    beforeEach(() => {
      (useUiStore as jest.Mock).mockReturnValue({
        handleOpenModal: mockHandleOpenModal,
      });
    });

    test("It must render the title.", () => {
      const { gets } = renderComponent({ goBack: false, filter: false });

      const title = gets?.getByText!("Notes App");

      expect(title).toBeTruthy();
    });
  });
});
