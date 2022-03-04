import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./features/Home";
import Lesson from "./features/Lesson";
import AddLesson from "./features/Lesson/AddLesson";
import EditLesson from "./features/Lesson/EditLesson";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-lesson" element={<AddLesson />} />
        <Route path="/lesson/:lessonId" element={<Lesson />} />
        <Route path="/lesson/:lessonId/edit" element={<EditLesson />} />
        <Route path="/lesson" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
