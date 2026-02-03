import { useState, useEffect } from "react";
import Axios from "axios";
import "./IncomeExpenseList.css";

import Showtransaction from "../components/Showtransaction";
import { months } from "../components/MonthYear";
import { years } from "../components/MonthYear";
import { incomeCategories } from "../components/Category";
import { expenseCategories } from "../components/Category";

const IncomeExpenseList = () => {
  const [incomebtn, setIncomeBtn] = useState(false);
  const now = new Date();

  //? Month for SQL
  const [month, setMonth] = useState(
    String(now.getMonth() + 1).padStart(2, "0"), // 01 - 12 (SQL Standard month)
  );
  //? Year for SQL
  const [year, setYear] = useState(String(now.getFullYear()));

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  const [transaction, setTransaction] = useState([]);
  const [transactionlength, setTransactionLength] = useState(0);

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
      setTransactionLength(response.data.count || 0);
    });
  };

  //! CALL GET Transaction filter by Type API
  const getTransactionFilterType = async () => {
    if (!month || !year || !category) {
      return;
    }
    await Axios.get(
      `${import.meta.env.VITE_API_URL}/api/showTransaction/month-transaction-type`,
      {
        params: {
          month,
          year,
          category,
        },
      },
    ).then((response) => {
      setTransaction(response.data.data || []);
      setTransactionLength(response.data.count || 0);
    });
  };

  useEffect(() => {
    getTransaction();
  }, []);

  useEffect(() => {
    if (!month || !year) return;

    if (category === "") {
      getTransaction();
    } else {
      getTransactionFilterType();
    }
  }, [month, year, type, category]);

  useEffect(() => {
    setType(incomebtn ? "income" : "expense");
    setCategory("");
  }, [incomebtn]);

  return (
    <>
      <div className="income-expense-container">
        <div className="toggle-wrapper">
          <div
            className={`sliding-bg ${incomebtn ? "income" : "expense"}`}
            style={{ transform: `translateX(${incomebtn ? "0px" : "105px"})` }}
          ></div>
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

        <select
          className="select-Month-Year"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {" "}
          <option value="">All</option>
          {incomebtn &&
            incomeCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          {!incomebtn &&
            expenseCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
      <div className="total-amount-item-box">
        <div
          className={`total-amount-box ${incomebtn ? "active income" : "active expense"}`}
        >
          <p>
            Total :{" "}
            <strong>
              {transaction.reduce((sum, item) => sum + Number(item.amount), 0)}
            </strong>{" "}
            THB
          </p>
        </div>{" "}
        <div
          className={`total-amount-box ${incomebtn ? "active income" : "active expense"}`}
        >
          <p>
            Total : x<strong>{transactionlength}</strong> item
          </p>
        </div>
      </div>
      {category === "" && (
        <Showtransaction
          transaction={transaction}
          getTransaction={() => getTransaction()}
        />
      )}
      {category !== "" && (
        <Showtransaction
          transaction={transaction}
          getTransaction={() => getTransactionFilterType()}
        />
      )}
    </>
  );
};

export default IncomeExpenseList;
