import { useEffect, useState } from "react";
import Axios from "axios";
import { PieChart, Pie } from "recharts";

import "./General_summary.css";

import Filter_time from "./Filter_time";
import Month_year_selecter from "./Month_year_selecter";

const General_summary = () => {

  const [timetype, setTimeType] = useState("all")

  const now = new Date();
  const [month, setMonth] = useState(
    String(now.getMonth() + 1).padStart(2, "0"),
  );
  const [year, setYear] = useState(String(now.getFullYear()));

  const [chartdata, setChartdata] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [countIncome, setCountIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [countExpense, setCountExpense] = useState(0);
  const total = totalIncome + totalExpense || 1;

  const incomePercent = Math.round((totalIncome / total) * 100);
  const expensePercent = 100 - incomePercent;

  const data = [
    { name: "Income", value: totalIncome, fill: "#4caf50" },
    { name: "Expense", value: totalExpense, fill: "#f44336" },
  ];

  //! Call GET Sum Income and Expense
  const getSumIncomExpense = async () => {
    await Axios.get(`${import.meta.env.VITE_API_URL}/api/getSummary/all`).then(
      (response) => {
        setTotalIncome(Number(response.data.data[0]?.total_income));
        setCountIncome(Number(response.data.data[0]?.count_income));
        setTotalExpense(Number(response.data.data[0]?.total_expense));
        setCountExpense(Number(response.data.data[0]?.count_expense));
      },
    );
  };

  useEffect(() => {
    getSumIncomExpense();
  }, []);

  useEffect(() => {
    if (timetype === "all"){
      getSumIncomExpense();
    }
    else if (timetype === "month"){
      
    }
  }, [timetype])

  return (
    <div className="general-summary">
      <div className="select-box">
        <Filter_time timetype={timetype} setTimeType={setTimeType}/>
        {timetype === "month" &&
          <Month_year_selecter
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        }
      </div>
      <PieChart width={260} height={260}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          dataKey="value"
          label={({ cx, cy }) => (
            <>
              {/* Income */}
              <text
                x={cx}
                y={cy - 10}
                textAnchor="middle"
                fontSize="22"
                fontWeight="bold"
                fill="#4caf50"
              >
                {incomePercent}%
              </text>

              {/* Expense */}
              <text
                x={cx}
                y={cy + 15}
                textAnchor="middle"
                fontSize="14"
                fill="#f44336"
              >
                {expensePercent}% Expense
              </text>
            </>
          )}
        />
      </PieChart>
      <div className="income-summary-text">
        <div className="type-count-content">
          <p>Income</p>
          <p>
            x<strong>{countIncome}</strong>{" "}
          </p>
        </div>
        <div className="amount-content">
          <strong>{totalIncome}</strong> THB
        </div>
      </div>
      <div className="expense-summary-text">
        <div className="type-count-content">
          <p>Expense</p>
          <p>
            x<strong>{countExpense}</strong>{" "}
          </p>
        </div>
        <div className="amount-content">
          <strong>{totalExpense}</strong> THB
        </div>
      </div>
    </div>
  );
};

export default General_summary;
