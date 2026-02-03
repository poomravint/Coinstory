const express = require("express");
const router = express.Router();
const db = require("../config/db");

//! Get Sum Income and Expense
router.get("/all", (req, res) => {
  const sql = `SELECT 
                 SUM(CASE WHEN money_type = 'income' THEN amount ELSE 0 END) AS total_income,
                 SUM(CASE WHEN money_type = 'expense' THEN amount ELSE 0 END) AS total_expense
               FROM transactions`;
    db.query (sql, (err,results) => {
      if (err)
      {
        return res.status(500).json(err)
      }
      res.json({
        data: results
      })
    })
})

module.exports = router;