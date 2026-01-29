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

//! Get todayExpense API
router.get("/today-expense", (req, res) => {
  const sql = `SELECT SUM(amount) as total_expense
               FROM transactions
               WHERE DATE(action_at) = CURDATE() AND money_type = "expense"`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    const total = results[0].total_expense ?? 0;
    res.json({
      total_expense: total,
    });
  });
});

//! POST transaction API
router.post("/addtransaction", (req, res) => {
  const { action_at, money_type, category, amount, note } = req.body;
  const sql = `INSERT INTO transactions (action_at, money_type, category, amount, note)
               VALUE (?,?,?,?,?)`;

  db.query(
    sql,
    [action_at, money_type, category, amount, note],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({
        message: "Transaction recorded successfully!",
        id: result.insertId, // ส่ง ID ที่เพิ่งสร้างใหม่กลับไปด้วย
      });
    },
  );
});

module.exports = router;
