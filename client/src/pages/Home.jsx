import { useState, useEffect } from "react";
import "./Home.css";
import Axios from "axios";

const Home = () => {
  const [totalCash, setTotalCash] = useState(0);

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
