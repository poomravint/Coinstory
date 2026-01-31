import { useState, use, useEffect } from "react";
import "./Updatepopup.css";
import "./Transactionform.css";

import Axios from "axios";

import { incomeCategories } from "./Category";
import { expenseCategories } from "./Category";

const Updatepopup = ({ item, onClose, onUpdated }) => {
  if (!item) return null;

  //! Update Date&Time for Show
  const formatForShow = (dt) => {
    const d = new Date(dt);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };
  //! Update Date&Time for SQL
  const formatForMySQL = (dt) => {
    return dt.replace("T", " ") + ":00";
  };

  const [dateTime, setDateTime] = useState(formatForShow(item.action_at));
  const [type, setType] = useState(item.money_type);
  const [category, setCategory] = useState(item.category);
  const [amount, setAmount] = useState(item.amount);
  const [note, setNote] = useState(item.note);

  //! Auto Update Category when change type
  useEffect(() => {
    if (type === item.money_type) {
      setCategory(item.category);
    } else {
      if (type === "income") {
        setCategory(incomeCategories[0]);
      } else {
        setCategory(expenseCategories[0]);
      }
    }
  }, [type]);

  //! CALL UPDATE transaction API
  const updatetransaction = async () => {
    try {
      const payload = {
        action_at: formatForMySQL(dateTime),
        money_type: type,
        category: category,
        amount: Number(amount),
        note: note,
      };

      const res = await Axios.put(
        `${import.meta.env.VITE_API_URL}/api/updateTransaction/update/${item.id}`,
        payload,
      );

      onUpdated();
      onClose();
      
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  };

  return (
    <>
      <div className="popup-overlay" onClick={onClose}>
        <div
          className={`popup-content t-form`}
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Edit Transaction</h3>
          <div className="type-cat-box">
            <div className="type-box">
              {/* Select type */}
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="cat-box">
              {/* Select category */}
              <label>Catagories</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {type === "income" &&
                  incomeCategories.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                {type === "expense" &&
                  expenseCategories.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Input Amount */}
          <label>Amount</label>
          <input
            className="amount-input"
            type="text"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0"
          />
          {/* Select Date and Time */}
          <label>Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          {/* Input Note */}
          <label>Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Detail"
          />
          <div className="button-box">
            <button className="save-btn" onClick={updatetransaction}>
              Save
            </button>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updatepopup;
