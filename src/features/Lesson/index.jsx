import { Route, Routes } from "react-router-dom";
import Auth from "../../components/Auth/Auth";

import AddLesson from "./pages/AddLesson";
import EditLesson from "./pages/EditLesson";
import ViewLesson from "./pages/ViewLesson";

function Lesson() {
  return (
      <Routes>
        <Route path="create-lesson" element={<Auth roles={['admin']}><AddLesson /></Auth>} />
        <Route path=":lessonId/edit" element={<Auth roles={['admin']}><EditLesson /></Auth>} />
        <Route path=":lessonId" element={<Auth roles={['user', 'admin']}><ViewLesson /></Auth>} />
      </Routes>
  );
}

export default Lesson;
