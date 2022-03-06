import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./features/Home";
import Lesson from "./features/Lesson";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/*" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
