const express = require("express");
const router = express.Router();
const db = require("../config/db");

//! Get totalCash API
router.get("/totalcash", (req, res) => {
  const sql = `SELECT SUM
  (CASE 
        WHEN money_type = 'income' THEN amount 
        ELSE -amount 
    END
    ) AS total 
  FROM transactions`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({
      total: results[0].total ?? 0,
    });
  });
});

module.exports = router;
