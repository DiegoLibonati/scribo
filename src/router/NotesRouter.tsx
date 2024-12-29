import { Routes, Route, Navigate } from "react-router-native";

import { NotesPage } from "../pages/NotesPage/NotesPage";
import { NotePage } from "../pages/NotePage/NotePage";
import { CreateNotePage } from "../pages/CreateNotePage/CreateNotePage";

export const NotesRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<NotesPage></NotesPage>}></Route>
      <Route path="/:idNote" element={<NotePage></NotePage>}></Route>
      <Route path="/new" element={<CreateNotePage></CreateNotePage>}></Route>
      <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};
