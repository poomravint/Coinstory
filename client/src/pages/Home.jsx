import { useState } from "react";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="total-box">
          <p>Your wallet</p>
          <div className="item-box total-cash">
            <p>Cash</p>
            <p>
              <strong>100</strong> THB
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
