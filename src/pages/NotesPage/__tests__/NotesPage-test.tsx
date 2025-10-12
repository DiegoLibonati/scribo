import { render } from "@testing-library/react-native";

import { MemoryRouter } from "react-router-native";
import { Provider } from "react-redux";

import { GlobalTest } from "@src/entities/tests";

import { NotesPage } from "@src/pages/NotesPage/NotesPage";

import { store } from "@src/app/store";

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
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider store={store}>
        <NotesPage></NotesPage>
      </Provider>
    </MemoryRouter>
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

describe("NotesPage.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the navbar and the filter button.", () => {
      const { gets } = renderComponent();

      const titleNavBar = gets?.getByText!("Notes App");
      const touchableOpenFilters = gets?.getByTestId!("open-filters");

      expect(titleNavBar).toBeTruthy();
      expect(touchableOpenFilters).toBeTruthy();
    });

    test("It must render the input search.", () => {
      const { gets } = renderComponent();

      const inputSearch = gets?.getByTestId!("search-input");

      expect(inputSearch).toBeTruthy();
    });

    test("It must render the message that there are no notes yet.", () => {
      const { gets } = renderComponent();

      const headingNotes = gets?.getByText!(
        "You still don't have notes created."
      );

      expect(headingNotes).toBeTruthy();
    });

    test("It should not render the modal.", () => {
      const { querys } = renderComponent();

      const modal = querys?.queryByTestId!("dialog-filter");

      expect(modal).toBeFalsy();
    });

    test("It must render the button to create notes.", () => {
      const { gets } = renderComponent();

      const touchableCreateNewNote = gets?.getByTestId!("create-new-note");

      expect(touchableCreateNewNote).toBeTruthy();
    });
  });
});
