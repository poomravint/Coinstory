import { useState, useEffect, use } from "react";
import Axios from "axios";

import "./Showtoday_expense.css";

const Showtoday_expense = () => {
  const [todayExpense, setTodayExpense] = useState([]);

  // * Time Format
  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // ! Get Today Expense API
  const getTodayExpense = () => {
    Axios.get(
      `${import.meta.env.VITE_API_URL}/api/showTransaction/today-expense`,
    ).then((response) => {
      setTodayExpense(response.data.data || 0);
    });
  };

  useEffect(() => {
    getTodayExpense();
  });

  return (
    <>
      <div className="expense-table">
        {todayExpense.map((item) => (
          <div className="today-expense-box">
            <div className="top-content">
              <p>Type : {item.category}</p>
              <p>
                <strong>{item.amount}</strong> THB
              </p>
            </div>
            {item.note && (
              <div className="middle-content">
                <p>Note : {item.note}</p>
              </div>
            )}
            <div className="buttom-content">
              <p>{formatDateTime(item.action_at)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Showtoday_expense;
