const express = require("express");
const router = express.Router();
const db = require("../config/db");

//! UPDATE Transaction API
router.put("/update/:id", (req, res) => {
  const { id } = req.params; //? Fetch ID from URL
  const { action_at, money_type, category, amount, note, } = req.body;

  const sql = `UPDATE transactions
               SET action_at = ?, money_type = ?, category = ?, amount = ?, note = ?
               WHERE id = ?`;

  db.query(
    sql,
    [action_at, money_type, category, amount, note, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // ตรวจสอบว่ามีข้อมูลโดนแก้ไขจริงไหม (id มีอยู่จริงไหม)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.json({
        message: "Updated successfully",
        affectedRows: result.affectedRows,
      });
    },
  );
});


module.exports = router;