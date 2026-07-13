import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/components/Sidebar";
import Navbar from "../pages/Dashboard/components/Navbar";
import "../pages/Dashboard/DashboardPage.css";

function MainLayout() {
    return (
        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <main className="dashboard-main">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default MainLayout;