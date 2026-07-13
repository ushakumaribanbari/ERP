import "./ReportsStats.css";
import {
    FaUsers,
    FaUserCheck,
    FaUserTimes,
    FaPercentage
} from "react-icons/fa";

function ReportsStats({ stats }) {

    const cards = [
    {
        title: "Employees",
        value: stats.totalEmployees,
        icon: <FaUsers />
    },
    {
        title: "Active Employees",
        value: stats.activeEmployees,
        icon: <FaUserCheck />
    },
    {
        title: "Inactive Employees",
        value: stats.inactiveEmployees,
        icon: <FaUserTimes />
    },
    {
        title: "Attendance Rate",
        value: `${stats.attendanceRate}%`,
        icon: <FaPercentage />
    }
];

    return (
        <div className="reports-stats">
            {cards.map((card, index) => (
                <div className="report-card" key={index}>
                    <div className="report-icon">
                        {card.icon}
                    </div>

                    <div>
                        <h3>{card.value}</h3>
                        <p>{card.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ReportsStats;