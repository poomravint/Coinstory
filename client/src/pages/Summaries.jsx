import { useState } from "react";

import "./Summaries.css";

const Summaries = () => {
  const [typebtn, setTypeBtn] = useState("general");

  const getTranslateX = () => {
    if (typebtn === "general") return "0px";
    if (typebtn === "income") return "105px"; // (ความกว้างปุ่ม 100px + gap 5px)
    if (typebtn === "expense") return "210px"; // (100px + 5px) * 2
    return "0px";
  };

  return (
    <>
      <div className="summaries-container">
        <div className="toggle-wrapper">
          <div
            className={`sliding-bg ${typebtn}`}
            style={{ transform: `translateX(${getTranslateX()})` }}
          ></div>

          <div
            className={`toggle-item ${typebtn === "general" ? "active" : ""}`}
            onClick={() => setTypeBtn("general")}
          >
            General
          </div>
          <div
            className={`toggle-item ${typebtn === "income" ? "active" : ""}`}
            onClick={() => setTypeBtn("income")}
          >
            Income
          </div>
          <div
            className={`toggle-item ${typebtn === "expense" ? "active" : ""}`}
            onClick={() => setTypeBtn("expense")}
          >
            Expense
          </div>
        </div>
      </div>
    </>
  );
};

export default Summaries;
