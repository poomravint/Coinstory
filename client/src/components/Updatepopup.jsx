import { useState, use, useEffect } from "react";
import "./Updatepopup.css";
import "./Transactionform.css";

import { incomeCategories } from "./Category";
import { expenseCategories } from "./Category";

const Updatepopup = ({ item, onClose }) => {
  if (!item) return null;

  //! Update Date&Time for Show
  const formatForShow = (dt) => {
    const d = new Date(dt);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

//! Checked
 const Check = () => {
  console.log("Before upload Type" ,type)
  console.log("Before upload Category" ,catagory)
  console.log("Before upload Amount" ,amount)
  console.log("Before upload Date" ,dateTime)
  console.log("Before upload Note" ,note)

 } 


  const [dateTime, setDateTime] = useState(formatForShow(item.action_at));
  const [type, setType] = useState(item.money_type);
  const [catagory, setCatagory] = useState(item.category);
  const [amount, setAmount] = useState(item.amount);
  const [note, setNote] = useState(item.note);

  //! Auto Update Category when change type
  useEffect(() => {
      if (type === item.money_type)
      {
        console.log("Active")
        setCatagory(item.category)
      }
      else
      {
        if (type === 'income')
        {
          setCatagory(incomeCategories[0])
        }
        else
        {
          setCatagory(expenseCategories[0]) 
        }
      }
  }, [type])

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
          <button onClick={Check}>Check</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default Updatepopup;
