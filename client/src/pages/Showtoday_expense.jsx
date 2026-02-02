import { useState, useEffect, use } from "react";
import Axios from "axios";

import "./Showtoday_expense.css";
import Updatepopup from "../components/Updatepopup";
import { formatDateTime } from "../components/TimeFormat";

const Showtoday_expense = () => {
  const [todayExpense, setTodayExpense] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // ! CALL GET Today Expense API
  const getTodayExpense = () => {
    Axios.get(
      `${import.meta.env.VITE_API_URL}/api/showTransaction/today-expense`,
    ).then((response) => {
      setTodayExpense(response.data.data || []);
    });
  };

  useEffect(() => {
    getTodayExpense();
  },[]);

  return (
    <>
      <div className="expense-table">
        {todayExpense.map((item) => (
          <div className="today-expense-box" key={item.id} onClick={() => setSelectedItem(item)}>
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
        <Updatepopup item={selectedItem} 
        onClose={() => setSelectedItem(null)}
        onUpdated={getTodayExpense}
        />
      

    </>
  );
};

export default Showtoday_expense;
