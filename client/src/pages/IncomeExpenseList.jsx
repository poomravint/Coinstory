import { useState } from "react";
import "./IncomeExpenseList.css";

import Showtransaction from "../components/Showtransaction";
import {months} from "../components/MonthYear";
import {years} from "../components/MonthYear";

const IncomeExpenseList = () => {
  const [incomebtn, setIncomeBtn] = useState(true);
  const now = new Date();

  //? Month and Year
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
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <select
          className="select-Month-Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((y) => (
            <option key= {y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <Showtransaction month={month} year={year} type={incomebtn ? "income" : "expense"}/>
    </>
  );
};

export default IncomeExpenseList;
