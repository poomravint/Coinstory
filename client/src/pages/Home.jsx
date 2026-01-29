import { useState, useEffect } from "react";
import "./Home.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import cashIcon from "../assets/cash.png";
import expenseIcon from "../assets/expenses.svg";
import Transactionform from "../components/Transactionform";

const Home = () => {
  const [totalCash, setTotalCash] = useState(0);
  const [todayExpense, setTodayExpense] = useState(0);

  //* For use Navigate
  const navigate = useNavigate();

  //! Get totalCash from API
  const getTotalCash = () => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/home/totalcash`).then(
      (response) => {
        setTotalCash(response.data.total || 0);
      },
    );
  };

  //! Get todayExpense from API
  const getTodayExpense = async () => {
    try {
      const response = await Axios.get(
        `${import.meta.env.VITE_API_URL}/api/home/today-expense`,
      );
      setTodayExpense(response.data.total_expense || 0);
    } catch (err) {}
  };

  useEffect(() => {
    getTotalCash();
    getTodayExpense();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="total-box">
          <p>Your wallet</p>
          {/* Cash box */}
          <div className="item-box total-cash">
            <div className="icon-box">
              <div className="icon-bg">
                <img src={cashIcon} alt="Cash Icon" className="cash-img" />
              </div>
              <p>
                <strong>{totalCash}</strong> THB
              </p>
            </div>
            <div className="detail-box">
              <p>Cash</p>
            </div>
          </div>
          {/* Today Expense box */}
          <div
            className="item-box today-expense"
            onClick={() => navigate("/today-expense")}
          >
            <div className="icon-box">
              <div className="icon-bg">
                <img
                  src={expenseIcon}
                  alt="Expense Icon"
                  className="expense-img"
                />
              </div>
              <p>
                <strong>{todayExpense}</strong> THB
              </p>
            </div>
            <div className="detail-box">
              <p>Today expense</p>
            </div>
          </div>
        </div>
        <Transactionform
          onTransactionAdded={() => {
            getTotalCash();
            getTodayExpense();
          }}
        />
      </div>
    </>
  );
};

export default Home;
