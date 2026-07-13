import "./EmployeeStats.css";
import { FaUsers, FaUserCheck, FaUserClock, FaBuilding } from "react-icons/fa";

function EmployeeStats({ employees }) {

    const total = employees.length;

    const active = employees.filter(
        emp => emp.status === "Active"
    ).length;

    const leave = employees.filter(
        emp => emp.status === "On Leave"
    ).length;

    const departments = new Set(
        employees.map(emp => emp.department)
    ).size;

    const cards = [
        {
            title: "Total Employees",
            value: total,
            icon: <FaUsers />,
            color: "#2563eb"
        },
        {
            title: "Active",
            value: active,
            icon: <FaUserCheck />,
            color: "#16a34a"
        },
        {
            title: "On Leave",
            value: leave,
            icon: <FaUserClock />,
            color: "#f59e0b"
        },
        {
            title: "Departments",
            value: departments,
            icon: <FaBuilding />,
            color: "#7c3aed"
        }
    ];

    return (
        <div className="stats-grid">

            {cards.map((card) => (

                <div className="stat-card" key={card.title}>

                    <div
                        className="stat-icon"
                        style={{ background: card.color }}
                    >
                        {card.icon}
                    </div>

                    <div>

                        <p>{card.title}</p>

                        <h2>{card.value}</h2>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default EmployeeStats;