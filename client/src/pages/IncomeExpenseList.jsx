import { useState } from "react";

import "./IncomeExpenseList.css";

const TxRxList = () => {
  const [incomebtn, setIncomeBtn] = useState(true);
  const now = new Date();

  const [month, setMonth] = useState(
    String(now.getMonth() + 1).padStart(2, "0"), // 01 - 12 (SQL Standard month)
  );
  const [year, setYear] = useState(String(now.getFullYear()));
  return (
    <>
      <div className="income-expense-container">
        <div className="toggle-wrapper">
          <div
            className={`toggle-item ${incomebtn ? "active income" : ""}`}
            onClick={() => setIncomeBtn(true)}
          >
            Income
          </div>
          <div
            className={`toggle-item ${!incomebtn ? "active expense" : ""}`}
            onClick={() => setIncomeBtn(false)}
          >
            Expense
          </div>
        </div>
      </div>
      <div className="select-box">
        <select
          className="select-Month-Year"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>

        <select
          className="select-Month-Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>
    </>
  );
};

export default TxRxList;
