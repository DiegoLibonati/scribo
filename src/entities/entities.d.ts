import { store } from "../slices/store";

import { DebugFunction } from "@testing-library/react-native";
import {
  GetAllByQuery,
  GetByQuery,
  QueryByQuery,
} from "@testing-library/react-native/build/queries/make-queries";
import {
  TextMatch,
  TextMatchOptions,
} from "@testing-library/react-native/build/matches";
import { CommonQueryOptions } from "@testing-library/react-native/build/queries/options";
import {
  ByRoleMatcher,
  ByRoleOptions,
} from "@testing-library/react-native/build/queries/role";

// New
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Modal = {
  isOpen: boolean;
};

export type UiState = {
  modal: Modal;
};

export type Note = {
  id: string;
  date: string;
  title: string;
  content: string;
};

export type Filter = {
  id: string;
  name: string;
  isActive: boolean;
};

export type NotesState = {
  notes: Note[];
  notesFiltered: Note[];
  isFiltering: boolean;
  filters: Filter[];
};

// Tests

export type GlobalTest = {
  debug: DebugFunction;
  gets?: {
    getByText?: GetByQuery<TextMatch, CommonQueryOptions & TextMatchOptions>;
    getByRole?: GetByQuery<ByRoleMatcher, ByRoleOptions>;
    getByTestId?: GetByQuery<TextMatch, CommonQueryOptions & TextMatchOptions>;
    getAllByTestId?: GetAllByQuery<
      TextMatch,
      CommonQueryOptions & TextMatchOptions
    >;
  };
  querys?: {
    queryByText?: QueryByQuery<
      TextMatch,
      CommonQueryOptions & TextMatchOptions
    >;
    queryByTestId?: QueryByQuery<
      TextMatch,
      CommonQueryOptions & TextMatchOptions
    >;
  };
};
