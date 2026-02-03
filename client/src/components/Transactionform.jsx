import { useState, useEffect, use } from "react";
import Axios from "axios";
import "./Transactionform.css";

import { setCurrentDateTime } from "./TimeFormat";
import { formatDateTimeForMySQL } from "./TimeFormat";
import { incomeCategories } from "./Category";
import { expenseCategories } from "./Category";

const Transactionform = ({ onTransactionAdded }) => {
  const [dateTime, setDateTime] = useState("");
  const [type, setType] = useState("expense");
  const [catagory, setCatagory] = useState("food");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    {
      type === "income" ? setCatagory("Salary") : setCatagory("Food");
    }
  }, [type]);

  useEffect(() => {
    {
      setCurrentDateTime(setDateTime);
    }
  }, []);

  // ! CALL POST Transaction API
  const postTransaction = async () => {
    if (!amount || !dateTime) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        action_at: formatDateTimeForMySQL(dateTime),
        money_type: type,
        category: catagory,
        amount: Number(amount),
        note: note,
      };

      const res = await Axios.post(
        `${import.meta.env.VITE_API_URL}/api/home/addtransaction`,
        payload,
      );
      //! Auto update content which show on home page
      onTransactionAdded();

      console.log("POST success:", res.data);

      // (option) reset form
      setAmount("");
      setNote("");
      setCurrentDateTime(setDateTime);
    } catch (err) {
      console.error("POST failed:", err);
    }
  };

  return (
    <>
      <div className="t-form">
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
            {/* Select catagory */}
            <label>Catagories</label>
            <select
              value={catagory}
              onChange={(e) => setCatagory(e.target.value)}
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
        <button onClick={postTransaction}>Add</button>
      </div>
    </>
  );
};

export default Transactionform;
