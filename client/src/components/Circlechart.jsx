import { PieChart, Pie } from "recharts";

const Circlechart = ({totalIncome,totalExpense}) => {

  const total = totalIncome + totalExpense || 1;

  const incomePercent = Math.round((totalIncome / total) * 100);
  const expensePercent = 100 - incomePercent;

  const data = [
    { name: "Income", value: totalIncome, fill: "#4caf50" },
    { name: "Expense", value: totalExpense, fill: "#f44336" },
  ];

  return (
    <PieChart width={260} height={260}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={110}
        dataKey="value"
        label={({ cx, cy }) => (
          <>
            {/* Income */}
            <text
              x={cx}
              y={cy - 10}
              textAnchor="middle"
              fontSize="22"
              fontWeight="bold"
              fill="#4caf50"
            >
              {incomePercent}%
            </text>

            {/* Expense */}
            <text
              x={cx}
              y={cy + 15}
              textAnchor="middle"
              fontSize="14"
              fill="#f44336"
            >
              {expensePercent}% Expense
            </text>
          </>
        )}
      />
    </PieChart>
  );
};

export default Circlechart;
