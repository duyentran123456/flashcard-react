import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddLesson from "./pages/AddLesson";
import EditLesson from "./pages/EditLesson";
import ViewLesson from "./pages/ViewLesson";

function Lesson() {
  return (
      <Routes>
        <Route path="create-lesson" element={<AddLesson />} />
        <Route path=":lessonId/edit" element={<EditLesson />} />
        <Route path=":lessonId" element={<ViewLesson />} />
      </Routes>
  );
}

export default Lesson;
