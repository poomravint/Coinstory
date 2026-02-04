import { useState } from "react";

import { months } from "./MonthYear";
import { years } from "./MonthYear";

const Month_year_selecter = ({ month, setMonth, year, setYear }) => {
  return (
    <div>
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
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Month_year_selecter;
