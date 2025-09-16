import { render } from "@testing-library/react-native";

import { GlobalTest } from "@src/entities/entities";

import { NoteComplete } from "@src/components/NoteComplete/NoteComplete";

type RenderComponent = {
  props: {
    date: string;
    title: string;
    content: string;
  };
} & GlobalTest;

const renderComponent = (): RenderComponent => {
  const props = {
    date: "date",
    title: "title",
    content: "contentcito",
  };

  const { debug, getByText, getByRole, getByTestId } = render(
    <NoteComplete
      date={props.date}
      title={props.title}
      content={props.content}
    ></NoteComplete>
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

describe("NoteComplete.tsx", () => {
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
