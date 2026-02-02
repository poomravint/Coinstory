import { useState, useEffect } from "react";
import Axios from "axios";
import "./IncomeExpenseList.css";

import Showtransaction from "../components/Showtransaction";
import { months } from "../components/MonthYear";
import { years } from "../components/MonthYear";

const IncomeExpenseList = () => {
  const [incomebtn, setIncomeBtn] = useState(true);
  const now = new Date();

  //? Month and Year
  const [month, setMonth] = useState(
    String(now.getMonth() + 1).padStart(2, "0"), // 01 - 12 (SQL Standard month)
  );
  const [year, setYear] = useState(String(now.getFullYear()));
  const [type, setType] = useState("income");

  const [transaction, setTransaction] = useState([]);

  //! CALL GET Transaction API
  const getTransaction = async () => {
    if (!month || !year || !type) {
      return;
    }
    await Axios.get(
      `${import.meta.env.VITE_API_URL}/api/showTransaction/month-transaction`,
      {
        params: {
          month,
          year,
          type,
        },
      },
    ).then((response) => {
      setTransaction(response.data.data || []);
    });
  };

  useEffect(() => {
    getTransaction();
  }, []);

  useEffect(() => {
    getTransaction();
  }, [{ month, year, type }]);

  useEffect(() => {
    setType(incomebtn ? "income" : "expense");
  }, [incomebtn]);

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
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className={`total-amount-box ${incomebtn ? "active income" : "active expense"}`}>
        <p>Total : <strong>{transaction.reduce((sum, item) => sum + Number(item.amount), 0)}</strong> THB</p>
      </div>
      <Showtransaction
        transaction={transaction}
        getTransaction={() => getTransaction()}
      />
    </>
  );
};

export default IncomeExpenseList;
