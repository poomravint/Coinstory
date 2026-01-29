import { useState, useEffect, use } from "react";
import Axios from "axios";
import "./Transactionform.css";

import { incomeCategories } from "./Category";
import { expenseCategories } from "./Category";

const Transactionform = () => {
  const [dateTime, setDateTime] = useState("");
  const [type, setType] = useState("expense");
  const [cetagory, setCetagory] = useState("food");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    {
      type === "income" ? setCetagory("Salary") : setCetagory("Food");
    }
  }, [type]);

  // ! Set current time
  useEffect(() => {
    {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setDateTime(now.toISOString().slice(0, 16));
      
    }
  }, [],);
   
// ! Change Time format for POST to DB
const formatDateTimeForMySQL = (dt) => {
  return dt.replace("T", " ") + ":00";
};

  // ! CALL POST Transaction API
  const postTransaction = async () => {
    try {
      const payload = {
        action_at: formatDateTimeForMySQL(dateTime),
        money_type: type,
        category: cetagory,
        amount: Number(amount),
        note: note,
      }
    
    const res = await Axios.post(
      `${import.meta.env.VITE_API_URL}/api/home/addtransaction`,
      payload
    )
    console.log("POST success:", res.data);

    
    // (option) reset form
    setAmount("");
    setNote("");
    setDateTime("");
    } catch (err){
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
            {/* Select cetagory */}
            <label>Catagories</label>
            <select
              value={cetagory}
              onChange={(e) => setCetagory(e.target.value)}
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
        {/* Select test */}
        <button onClick={postTransaction}>Add</button>
      </div>
    </>
  );
};

export default Transactionform;
