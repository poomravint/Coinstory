import { useState, useEffect } from "react";
import "./Home.css";
import Axios from "axios";

const Home = () => {
  const [totalCash, setTotalCash] = useState(0);

  const getTotalCash = () => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/home/totalcash`).then(
      (response) => {
        setTotalCash(response.data.total || 0);
      },
    );
  };

  useEffect(() => {
    getTotalCash();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="total-box">
          <p>Your wallet</p>
          <div className="item-box total-cash">
            <p>Cash</p>
            <p>
              <strong>{totalCash}</strong> THB
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
