import "./Charts.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const attendanceData = [
  { day: "Mon", attendance: 92 },
  { day: "Tue", attendance: 95 },
  { day: "Wed", attendance: 94 },
  { day: "Thu", attendance: 97 },
  { day: "Fri", attendance: 96 },
  { day: "Sat", attendance: 93 },
];

const revenueData = [
  { month: "Jan", revenue: 18 },
  { month: "Feb", revenue: 24 },
  { month: "Mar", revenue: 30 },
  { month: "Apr", revenue: 28 },
  { month: "May", revenue: 34 },
  { month: "Jun", revenue: 40 },
];

function Charts() {
  return (
    <div className="charts-grid">

      <div className="chart-card">
        <h3>Weekly Attendance</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Revenue Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="revenue"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;