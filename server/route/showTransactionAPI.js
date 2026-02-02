const express = require("express");
const router = express.Router();
const db = require("../config/db");

//! GET All today transactions
router.get("/today-expense", (req, res) => {
  const sql = `SELECT * FROM transactions
               WHERE DATE(action_at) = CURDATE() AND money_type = "expense"
               ORDER BY action_at ASC`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({
      data: results,
    });
  });
});

//! GET Month transaction
router.get("/month-transaction", (req, res) => {
  const { month, year, type } = req.query;

  if (!month || !year || !type) {
    return res
      .status(400)
      .json({ message: "Please provide month, year, and type" });
  }

  const sql = `SELECT * FROM transactions
               WHERE MONTH(action_at) = ?
               AND YEAR(action_at) = ?
               AND money_type = ?
               ORDER BY action_at DESC`;

  db.query(sql, [month, year, type], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      count: results.length,
      data: results,
    });
  });
});

//! GET Month Transaction filter by Type
router.get("/month-transaction-type", (req, res) => {
  const { month, year, category } = req.query;
  if (!month || !year || !category) {
    return res
      .status(400)
      .json({ message: "Please provide month, year, and category" });
  }

  const sql = `SELECT * FROM transactions
               WHERE MONTH(action_at) = ?
               AND YEAR(action_at) = ?
               AND category = ?
               ORDER BY action_at DESC`;
  db.query(sql, [month, year, category], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      count: results.length,
      data: results,
    });
  });
});
module.exports = router;
