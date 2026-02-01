import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Summaries from "./pages/Summaries.jsx";
import Showtoday_expense from "./pages/Showtoday_expense.jsx";
import TxRxList from "./pages/TxRxList.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summaries" element={<Summaries />} />
            <Route path="/today-expense" element={<Showtoday_expense />} />
            <Route path="/list" element={<TxRxList />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
