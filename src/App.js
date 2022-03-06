import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";

import Home from "./features/Home";
import Lesson from "./features/Lesson";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lesson/*" element={<Lesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
