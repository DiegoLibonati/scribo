import { Routes, Route, Navigate } from "react-router-native";

import { NotesPage } from "@src/pages/NotesPage/NotesPage";
import { NotePage } from "@src/pages/NotePage/NotePage";
import { CreateNotePage } from "@src/pages/CreateNotePage/CreateNotePage";

export const NotesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesPage></NotesPage>}></Route>
      <Route path="/:idNote" element={<NotePage></NotePage>}></Route>
      <Route path="/new" element={<CreateNotePage></CreateNotePage>}></Route>
      <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};
