import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042", "#0088FE", "#FFBB28"];

const TaskAnalytics = ({ tasks }) => {
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const progress = tasks.filter(t => t.status === "In Progress").length;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "In Progress", value: progress },
  ];

  return (
    <div className="analytics-container">
      <h2>Task Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskAnalytics;
