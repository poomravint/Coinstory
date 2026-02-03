const express = require("express");
const cors = require("cors");
const homeRoutes = require("./route/homeAPI");
const showTransaction = require("./route/showTransactionAPI");
const updateTransaction = require("./route/updateTransactionAPI");
const deleteTransaction = require("./route/deleteTransationAPI");
const getSummary = require("./route/getSummaryAPI");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/home", homeRoutes);
app.use("/api/showTransaction", showTransaction);
app.use("/api/updateTransaction", updateTransaction);
app.use("/api/deleteTransaction", deleteTransaction);
app.use("/api/getSummary", getSummary);

app.listen(5000, () => console.log("Server is running on port 5000"));
