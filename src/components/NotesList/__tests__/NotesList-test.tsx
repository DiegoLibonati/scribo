import { render } from "@testing-library/react-native";

import { MemoryRouter } from "react-router-native";
import { Provider } from "react-redux";

import { GlobalTest, Note } from "../../../entities/entities";

import { NotesList } from "../NotesList";

import { useNotesStore } from "../../../hooks/useNotesStore";
import { store } from "../../../slices/store";

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
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <NotesList />
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

jest.mock("../../../hooks/useNotesStore", () => ({
  ...jest.requireActual("../../../hooks/useNotesStore"),
  useNotesStore: jest.fn(),
}));

describe("NoteList.tsx", () => {
  describe("If there are no notes and it is not filtering.", () => {
    const notes: Note[] = [];
    const notesFiltered: Note[] = [];
    const isFiltering = false;

    beforeEach(() => {
      (useNotesStore as jest.Mock).mockReturnValue({
        notes: notes,
        notesFiltered: notesFiltered,
        isFiltering: isFiltering,
      });
    });

    test("It must render the title as there are no notes created yet.", () => {
      const { gets } = renderComponent();

      const title = gets?.getByText!("You still don't have notes created.");

      expect(title).toBeTruthy();
    });
  });

  describe("If there are no notes filtered and is filtering.", () => {
    const notes: Note[] = [];
    const notesFiltered: Note[] = [];
    const isFiltering = true;

    beforeEach(() => {
      (useNotesStore as jest.Mock).mockReturnValue({
        notes: notes,
        notesFiltered: notesFiltered,
        isFiltering: isFiltering,
      });
    });

    test("It must render the title as there are no notes.", () => {
      const { gets } = renderComponent();

      const title = gets?.getByText!("No notes found.");

      expect(title).toBeTruthy();
    });
  });

  describe("If there are notes and it is not being filtered.", () => {
    const notes: Note[] = [
      { id: "1", date: "123", title: "pepe", content: "cont" },
      { id: "12", date: "1234", title: "pepe2", content: "cont1" },
    ];
    const notesFiltered: Note[] = [];
    const isFiltering = false;

    beforeEach(() => {
      (useNotesStore as jest.Mock).mockReturnValue({
        notes: notes,
        notesFiltered: notesFiltered,
        isFiltering: isFiltering,
      });
    });

    test("It must render the total notes.", () => {
      const { gets } = renderComponent();

      const notes = gets?.getAllByTestId!(/note-/i);

      expect(notes).toHaveLength(notes?.length!);
    });
  });

  describe("If there are notes filtered and is filtering.", () => {
    const notes: Note[] = [
      { id: "1", date: "123", title: "pepe", content: "cont" },
      { id: "12", date: "1234", title: "pepe2", content: "cont1" },
    ];
    const notesFiltered: Note[] = [
      { id: "1", date: "123", title: "pepe", content: "cont" },
    ];
    const isFiltering = true;

    beforeEach(() => {
      (useNotesStore as jest.Mock).mockReturnValue({
        notes: notes,
        notesFiltered: notesFiltered,
        isFiltering: isFiltering,
      });
    });

    test("It must render the total notes.", () => {
      const { gets } = renderComponent();

      const notes = gets?.getAllByTestId!(/note-/i);

      expect(notes).toHaveLength(notesFiltered?.length!);
    });
  });
});
