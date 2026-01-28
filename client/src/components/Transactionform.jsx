import { useState, useEffect, use } from "react";
import "./Transactionform.css";

import { incomeCategories } from "./Catagory";
import { expenseCategories } from "./Catagory";

const Transactionform = () => {
  const [type, setType] = useState("expense");
  const [catagory, setCatagory] = useState("food");
  const [amount, setAmount] = useState()

  useEffect(() => {
    {
      type === "income" ? setCatagory("Salary") : setCatagory("Food");
    }
  }, [type]);

  // ! For test
  const [test, setTest] = useState("");
  useEffect(() => {
    console.log({ type }, { catagory }, {amount});
  }, [test]);
  // !

  return (
    <>
      <div className="t-form">
        {/* Select type */}
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {/* Select catagory */}
        <label>Catagories</label>
        <select value={catagory} onChange={(e) => setCatagory(e.target.value)}>
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
        {/* Input Amount */}
        <label>Amount</label>

        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder= "0" />


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
