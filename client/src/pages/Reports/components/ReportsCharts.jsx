import "./ReportsCharts.css";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

import {
    LineChart,
    Line,
    CartesianGrid
} from "recharts";

function ReportsCharts({
    departmentData,
    attendanceData,
    leaveChartData,
    monthlyTrendData

}) {

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042"
    ];

    return (
    <div className="reports-charts">

        {/* Department Distribution */}
        <div className="chart-card">
            <h3>Department Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={departmentData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >
                        {departmentData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>

        {/* Attendance Overview */}
        <div className="chart-card">
            <h3>Attendance Overview</h3>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar
                        dataKey="count"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Leave Status Overview */}
        <div className="chart-card">
            <h3>Leave Status Overview</h3>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
    data={leaveChartData || []}
    dataKey="value"
    nameKey="name"
    outerRadius={100}
    label
>
    {leaveChartData?.map((entry, index) => (
        <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
        />
    ))}
</Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>

        <div className="chart-card">
    <h3>Monthly Trends</h3>

    <ResponsiveContainer width="100%" height={350}>
        <LineChart data={monthlyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />
            <Legend />

            <Line
                type="monotone"
                dataKey="attendance"
                stroke="#3b82f6"
                strokeWidth={3}
            />

            <Line
                type="monotone"
                dataKey="leaves"
                stroke="#ef4444"
                strokeWidth={3}
            />

            <Line
                type="monotone"
                dataKey="employees"
                stroke="#22c55e"
                strokeWidth={3}
            />
        </LineChart>
    </ResponsiveContainer>
</div>

    </div>
);
}

export default ReportsCharts;