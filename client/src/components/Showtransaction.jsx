import { useState, useEffect } from "react";
import "./Showtransaction.css";
import Axios from "axios";

import Updatepopup from "./Updatepopup";

import { formatDateTime } from "../components/TimeFormat";

const Showtransaction = ({ month, year, type }) => {
  const [transaction, setTransaction] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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
    });
  };

  useEffect(() => {
    getTransaction();
  }, []);

  useEffect(() => {
    getTransaction();
  }, [{ month, year, type }]);

  return (
    <>
      <div className="show-table">
        {transaction.map((item) => (
          <div
            className={`transaction-box ${item.money_type === "income" ? "income-box" : "expense-box"}`}
            key={item.id}
            onClick={() => setSelectedItem(item)}
          >
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
      <Updatepopup
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdated={getTransaction}
      />
    </>
  );
};

export default Showtransaction;
