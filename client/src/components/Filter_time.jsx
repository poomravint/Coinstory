import React from "react";

import "./Filter_time.css";

const Filter_time = ({ timetype, setTimeType }) => {
  return (
    <>
      <div className="filter-time-container">
        <div
          className={`filter-button ${timetype === "all" ? "active" : ""}`}
          onClick={() => setTimeType("all")}
        >
          All
        </div>
        <div
          className={`filter-button ${timetype === "month" ? "active" : ""}`}
          onClick={() => setTimeType("month")}
        >
          Month
        </div>
        <div
          className={`filter-button ${timetype === "year" ? "active" : ""}`}
          onClick={() => setTimeType("year")}
        >
          Year
        </div>
      </div>
    </>
  );
};

export default Filter_time;
