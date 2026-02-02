import { useState, useEffect } from "react";
import "./Home.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import cashIcon from "../assets/cash.png";
import expenseIcon from "../assets/expenses.svg";
import monthIcon from "../assets/month.png"
import Transactionform from "../components/Transactionform";
import { months } from "../components/MonthYear";

const Home = () => {
  const [totalCash, setTotalCash] = useState(0);
  const [todayExpense, setTodayExpense] = useState(0);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);

  //* For use Navigate
  const navigate = useNavigate();

  //* For current get month
  const now = new Date();
  const currentmonth = Number(now.getMonth());

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

  //! Get currentMonth Expense from API
  const getCurrentMonthExpense = async () => {
    try {
      const response = await Axios.get(
        `${import.meta.env.VITE_API_URL}/api/home/currentmonth-expense`,
      );
      setCurrentMonthExpense(response.data.total_month_expense || 0);
    } catch (err) {}
  };

  //! Get currentMonth Income from API
  const getCurrentMonthIncome = async () => {
    try {
      const response = await Axios.get(
        `${import.meta.env.VITE_API_URL}/api/home/currentmonth-income`,
      );
      setCurrentMonthIncome(response.data.total_month_income || 0);
    } catch (err) {}
  };

  useEffect(() => {
    getTotalCash();
    getTodayExpense();
    getCurrentMonthExpense();
    getCurrentMonthIncome();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="total-box">
          {/* Cash box */}
          <div className="item-box total-cash">
            <div className="icon-box">
              <div className="icon-bg">
                <img src={cashIcon} alt="Cash Icon" className="cash-img" />
              </div>
              <p>
                <strong className={totalCash < 0 ? "red-active" : ""}>{totalCash}</strong> THB
              </p>
            </div>
            <div className="detail-box">
              <p>Cash</p>
            </div>
          </div>

          {/* Today Expense box */}
          <div
            className="item-box today-expense"
            onClick={() => {
              if (todayExpense !== 0) {
                navigate("/today-expense");
              }
            }}
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
          <div
            className="item-box currentmonth-remaining"
            onClick={() => {
              if (todayExpense !== 0) {
                navigate("/today-expense");
              }
            }}
          >
            {/* Month Result box */}
            <div className="icon-box">
              <div className="icon-bg">
                <img
                  src={monthIcon}
                  alt="Month Icon"
                  className="month-img"
                />
              </div>
              <p>
                <strong
                  className={
                    currentMonthExpense > currentMonthIncome ? "red-active" : ""
                  }
                >
                  {currentMonthExpense}
                </strong>
                /<strong>{currentMonthIncome}</strong> THB
              </p>
            </div>
            <div className="detail-box">
              <p>{months[currentmonth].fullname}</p>
            </div>
          </div>
        </div>
        <Transactionform
          onTransactionAdded={() => {
            getTotalCash();
            getTodayExpense();
            getCurrentMonthExpense();
            getCurrentMonthIncome();
          }}
        />
      </div>
    </>
  );
};

export default Home;
