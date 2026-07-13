import "./StatsCards.css";

import {
  FaUsers,
  FaUserCheck,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

const stats = [
  {
    title: "Employees",
    value: "324",
    change: "+12 this month",
    icon: <FaUsers />,
  },
  {
    title: "Attendance",
    value: "96%",
    change: "+2% Today",
    icon: <FaUserCheck />,
  },
  {
    title: "Payroll",
    value: "₹12.5 L",
    change: "Processed",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Revenue",
    value: "₹4.8 Cr",
    change: "+18%",
    icon: <FaChartLine />,
  },
];

function StatsCards() {
  return (
    <div className="stats-grid">
      {stats.map((card) => (
        <div className="stat-card" key={card.title}>

          <div className="stat-top">

            <div>
              <h4>{card.title}</h4>
              <h2>{card.value}</h2>
            </div>

            <div className="stat-icon">
              {card.icon}
            </div>

          </div>

          <p>{card.change}</p>

        </div>
      ))}
    </div>
  );
}

export default StatsCards;