import { render, fireEvent } from "@testing-library/react-native";

import { MemoryRouter, Route, Routes } from "react-router-native";
import { Provider } from "react-redux";

import { Note } from "@src/entities/app";
import { GlobalTest } from "@src/entities/tests";

import { NotePage } from "@src/pages/NotePage/NotePage";

import { useNotesStore } from "@src/hooks/useNotesStore";
import { store } from "@src/app/store";

type RenderComponent = {} & GlobalTest;

const idNote = "1";
const currentPath = `/${idNote}`;

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
      initialEntries={[currentPath]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route
          path="/:idNote"
          element={
            <Provider store={store}>
              <NotePage></NotePage>
            </Provider>
          }
        ></Route>
        <Route path="/*" element={<div>Hi</div>}></Route>
      </Routes>
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

describe("NotePage.tsx", () => {
  describe("General Tests.", () => {
    const notes: Note[] = [
      { id: "1", content: "pepe", date: "asd", title: "12345" },
    ];
    const currentNote = notes.find((note) => note.id === idNote);

    const mockHandleRemoveNote = jest.fn();

    beforeEach(() => {
      (useNotesStore as jest.Mock).mockReturnValue({
        notes: notes,
        handleRemoveNote: mockHandleRemoveNote,
      });
    });

    test("It must render the navbar and the goBack button.", () => {
      const { gets } = renderComponent();

      const titleNavBar = gets?.getByText!("Notes App");
      const touchableGoBack = gets?.getByTestId!("go-back");

      expect(titleNavBar).toBeTruthy();
      expect(touchableGoBack).toBeTruthy();
    });

    test("It must render the date, title and content of the note.", () => {
      const { gets } = renderComponent();

      const date = gets?.getByText!(currentNote?.date!);
      const title = gets?.getByText!(currentNote?.title!);
      const content = gets?.getByText!(currentNote?.content!);

      expect(date).toBeTruthy();
      expect(title).toBeTruthy();
      expect(content).toBeTruthy();
    });

    test("It must render the remove note button and also execute the relevant functions when it is pressed.", () => {
      const { gets } = renderComponent();

      const touchableRemoveNote = gets?.getByTestId!(/remove-note-/i);

      expect(touchableRemoveNote).toBeTruthy();

      fireEvent.press(touchableRemoveNote);

      expect(mockHandleRemoveNote).toHaveBeenCalledTimes(1);
      expect(mockHandleRemoveNote).toHaveBeenCalledWith(idNote);
    });
  });
});
