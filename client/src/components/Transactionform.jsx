import { useState, useEffect, use } from "react";
import "./Transactionform.css";

import { incomeCategories } from "./Catagory";
import { expenseCategories } from "./Catagory";

const Transactionform = () => {
  const [type, setType] = useState("expense");
  const [catagory, setCatagory] = useState("food");
  const [amount, setAmount] = useState();
  const [dateTime, setDateTime] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    {
      type === "income" ? setCatagory("Salary") : setCatagory("Food");
    }
  }, [type]);

  // ! Set current time
  useEffect(() => {
    {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      setDateTime(now.toISOString().slice(0, 16));
    }
  }, []);

  // ! For test
  const [test, setTest] = useState("");
  useEffect(() => {
    console.log({ type }, { catagory }, { amount }, { dateTime }, { note });
  }, [test]);
  // !

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
          type="number"
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
        <select value={test} onChange={(e) => setTest(e.target.value)}>
          <option value="income">0</option>
          <option value="expense">1</option>
        </select>
      </div>
    </>
  );
};

export default Transactionform;
