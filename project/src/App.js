import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blind from "./pages/Blind";
import Deaf from "./pages/Deaf";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blind" element={<Blind />} />
        <Route path="/deaf" element={<Deaf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
