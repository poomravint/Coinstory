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

module.exports = router;
