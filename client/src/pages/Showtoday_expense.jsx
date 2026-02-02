import { useState, useEffect, use } from "react";
import Axios from "axios";

import "./Showtoday_expense.css";
import Showtransaction from "../components/Showtransaction";
import Updatepopup from "../components/Updatepopup";
import { formatDateTime } from "../components/TimeFormat";

const Showtoday_expense = () => {
  const [transaction, setTransaction] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // ! CALL GET Today Expense API
  const getTodayExpense = () => {
    Axios.get(
      `${import.meta.env.VITE_API_URL}/api/showTransaction/today-expense`,
    ).then((response) => {
      setTransaction(response.data.data || []);
    });
  };

  useEffect(() => {
    getTodayExpense();
  }, []);

  return (
    <>
      <div className="expense-table">
        <Showtransaction
          transaction={transaction}
          getTransaction={() => getTodayExpense()}
        />
      </div>
      <Updatepopup
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdated={getTodayExpense}
      />
    </>
  );
};

export default Showtoday_expense;
