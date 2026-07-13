import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaChartBar } from "react-icons/fa";

const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Employees", path: "/employees" },
    { name: "Attendance", path: "/attendance" },
    { name: "Leave Management", path: "/leaves" },
    { name: "Payroll", path: "/payroll" },
    { name: "Finance", path: "/finance" },
    //{ name: "Inventory", path: "/inventory" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo">
                    A
                </div>

                <div className="sidebar-title">
                    <h2>AICore System</h2>
                    <p>AI-Powered Enterprise Platform</p>
                </div>
            </div>

            <div className="sidebar-menu">
                {menus.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;