const express = require("express");
const router = express.Router();
const db = require("../config/db");

//! Delete Transaction API
router.delete("/:id", (req, res) => {
  const {id} = req.params

  const sql = `DELETE FROM transactions WHERE id = ?`

  db.query(sql, [id], (err, result) => {
    if (err)
    {
      console.error(err);
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0)
    {
      return res.status(404).json({ message: "Transaction not found"})
    }
    
    res.json({
      message: "Transaction deleted successfuly!",
      id: id
    })
  })
})

module.exports = router;