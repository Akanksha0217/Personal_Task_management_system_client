import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklyCompletionChart = ({ tasks }) => {
  // Get last 7 days
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  }).reverse();

  const data = last7Days.map((date) => {
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    const completedCount = tasks.filter(
      (task) =>
        task.status === "Completed" &&
        new Date(task.updatedAt).toDateString() === date.toDateString()
    ).length;

    return { day, completed: completedCount };
  });

  return (
    <div className="weekly-chart">
      <h2>Weekly Task Completion</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completed"
            strokeWidth={3}
            dot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyCompletionChart;
