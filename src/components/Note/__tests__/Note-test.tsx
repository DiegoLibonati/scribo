import { render } from "@testing-library/react-native";

import { MemoryRouter } from "react-router-native";

import { GlobalTest } from "@src/entities/tests";

import { Note } from "@src/components/Note/Note";
import { NoteProps } from "@src/entities/props";

type RenderComponent = {
  props: NoteProps;
} & GlobalTest;

const renderComponent = (): RenderComponent => {
  const props = {
    id: "12345",
    date: "date",
    title: "title",
    content: "contentcito",
  };

  const { debug, getByText, getByRole, getByTestId } = render(
    <MemoryRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Note
        id={props.id}
        date={props.date}
        title={props.title}
        content={props.content}
      ></Note>
    </MemoryRouter>
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

describe("Note.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the date, title and content of the note.", () => {
      const { gets, props } = renderComponent();

      const date = gets?.getByText!(props.date);
      const title = gets?.getByText!(props.title);
      const content = gets?.getByText!(props.content);

      expect(date).toBeTruthy();
      expect(title).toBeTruthy();
      expect(content).toBeTruthy();
    });
  });
});
