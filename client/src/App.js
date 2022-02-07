import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Title from "./components/title";
import CrawMembers from "./pages/crawMembers";
import Ships from "./pages/ships";

function App() {
  return (
    <div className="app">
      <Title className="w-full flex items-center bg-gray-200" />
      <Router>
        <Routes>
          <Route path="/" element={<Ships />} />
          <Route path="/ships/:id/crawMembers" element={<CrawMembers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
