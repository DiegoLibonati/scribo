import { Routes, Route, Navigate } from "react-router-native";

import { NotesPage } from "@src/pages/NotesPage/NotesPage";
import { NotePage } from "@src/pages/NotePage/NotePage";
import { CreateNotePage } from "@src/pages/CreateNotePage/CreateNotePage";

import { PublicRoute } from "@src/router/PublicRoute";

export const NotesRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<NotesPage></NotesPage>}></Route>
        <Route path="/:idNote" element={<NotePage></NotePage>}></Route>
        <Route path="/new" element={<CreateNotePage></CreateNotePage>}></Route>
      </Route>

      <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};
