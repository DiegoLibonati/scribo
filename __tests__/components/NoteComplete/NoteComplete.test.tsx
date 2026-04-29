import { render, screen } from "@testing-library/react-native";

import type { RenderAPI } from "@testing-library/react-native";
import type { NoteCompleteProps } from "@/types/props";

import NoteComplete from "@/components/NoteComplete/NoteComplete";

const renderComponent = (props: Partial<NoteCompleteProps> = {}): RenderAPI => {
  const defaultProps: NoteCompleteProps = {
    date: "29 April",
    title: "My Note Title",
    content: "My note content",
    ...props,
  };
  return render(<NoteComplete {...defaultProps} />);
};

describe("NoteComplete", () => {
  describe("rendering", () => {
    it("should render the date", () => {
      renderComponent();
      expect(screen.getByText("29 April")).toBeTruthy();
    });

    it("should render the title", () => {
      renderComponent();
      expect(screen.getByText("My Note Title")).toBeTruthy();
    });

    it("should render the content", () => {
      renderComponent();
      expect(screen.getByText("My note content")).toBeTruthy();
    });

    it("should render custom text values", () => {
      renderComponent({ date: "01 January", title: "Custom Title", content: "Custom Content" });
      expect(screen.getByText("01 January")).toBeTruthy();
      expect(screen.getByText("Custom Title")).toBeTruthy();
      expect(screen.getByText("Custom Content")).toBeTruthy();
    });
  });

  describe("edge cases", () => {
    it("should render with empty string values without crashing", () => {
      renderComponent({ date: "", title: "", content: "" });
      expect(screen.queryByText("My Note Title")).toBeNull();
    });
  });
});
