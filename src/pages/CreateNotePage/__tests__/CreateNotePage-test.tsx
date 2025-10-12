import { fireEvent, render } from "@testing-library/react-native";

import { MemoryRouter } from "react-router-native";
import { Provider } from "react-redux";

import { GlobalTest } from "@src/entities/tests";

import { CreateNotePage } from "@src/pages/CreateNotePage/CreateNotePage";

import { store } from "@src/slices/store";
import { useNotesStore } from "@src/hooks/useNotesStore";

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
        <CreateNotePage></CreateNotePage>
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

jest.mock("@src/hooks/useNotesStore", () => ({
  ...jest.requireActual("@src/hooks/useNotesStore"),
  useNotesStore: jest.fn(),
}));

describe("CreateNotePage.tsx", () => {
  describe("General Tests.", () => {
    const mockHandleSetNewNote = jest.fn();

    beforeEach(() => {
      (useNotesStore as jest.Mock).mockReturnValue({
        handleSetNewNote: mockHandleSetNewNote,
      });
    });

    test("It must render the navbar and the goBack button.", () => {
      const { gets } = renderComponent();

      const titleNavBar = gets?.getByText!("Notes App");
      const touchableGoBack = gets?.getByTestId!("go-back");

      expect(titleNavBar).toBeTruthy();
      expect(touchableGoBack).toBeTruthy();
    });

    test("It must render the input with title and content label. Also the submit form button.", () => {
      const { gets } = renderComponent();

      const inputTitle = gets?.getByTestId!(`input-Insert a Title`);
      const inputContent = gets?.getByTestId!(`input-Insert a Content`);
      const touchableCreateNote = gets?.getByTestId!("create-note");

      expect(inputTitle).toBeTruthy();
      expect(inputContent).toBeTruthy();
      expect(touchableCreateNote).toBeTruthy();
    });

    test("It should create a note when you press the create note button.", () => {
      const title = "asd";
      const content = "123";

      const { gets } = renderComponent();

      const inputTitle = gets?.getByTestId!(`input-Insert a Title`);
      const inputContent = gets?.getByTestId!(`input-Insert a Content`);
      const touchableCreateNote = gets?.getByTestId!("create-note");

      expect(inputTitle).toBeTruthy();
      expect(inputContent).toBeTruthy();
      expect(touchableCreateNote).toBeTruthy();

      fireEvent.changeText(inputTitle, title);
      fireEvent.changeText(inputContent, content);

      fireEvent.press(touchableCreateNote);

      expect(mockHandleSetNewNote).toHaveBeenCalledTimes(1);
      expect(mockHandleSetNewNote).toHaveBeenCalledWith({
        id: expect.any(String),
        date: expect.any(String),
        title: title,
        content: content,
      });
    });
  });
});
