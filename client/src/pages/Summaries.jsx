import { useEffect, useState } from "react";
import Axios from "axios";

import "./Summaries.css";

import General_summary from "../components/General_summary";

const Summaries = () => {
  const [typebtn, setTypeBtn] = useState("general");
  const [chartdata, setChartdata] = useState([]);

  //! Call GET Sum Income and Expense
  const getSumIncomExpense = async () => {
    await Axios.get(`${import.meta.env.VITE_API_URL}/api/getSummary/all`).then(
      (response) => {
        setChartdata(response.data.data || []);
      },
    );
  };

  useEffect(() => {
    getSumIncomExpense();
  }, [typebtn]);

  const getTranslateX = () => {
    if (typebtn === "general") return "0px";
    if (typebtn === "income") return "105px"; // (ความกว้างปุ่ม 100px + gap 5px)
    if (typebtn === "expense") return "210px"; // (100px + 5px) * 2
    return "0px";
  };

  return (
    <>
      <div className="summaries-container">
        <div className="toggle-wrapper">
          <div
            className={`sliding-bg ${typebtn}`}
            style={{ transform: `translateX(${getTranslateX()})` }}
          ></div>

          <div
            className={`toggle-item ${typebtn === "general" ? "active" : ""}`}
            onClick={() => setTypeBtn("general")}
          >
            General
          </div>
          <div
            className={`toggle-item ${typebtn === "income" ? "active" : ""}`}
            onClick={() => setTypeBtn("income")}
          >
            Income
          </div>
          <div
            className={`toggle-item ${typebtn === "expense" ? "active" : ""}`}
            onClick={() => setTypeBtn("expense")}
          >
            Expense
          </div>
        </div>
      </div>
      {typebtn === "general" && (
        <div className="chart-box">
          <General_summary />
        </div>
      )}
      {typebtn === "income" && (
        <div className="chart-box">
          <General_summary />
        </div>
      )}
      {typebtn === "expense" && (
        <div className="chart-box">
          <General_summary />
        </div>
      )}
    </>
  );
};

export default Summaries;
