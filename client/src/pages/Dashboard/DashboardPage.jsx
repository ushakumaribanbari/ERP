import WelcomeCard from "./components/WelcomeCard";
import StatsCards from "./components/StatsCards";
import Charts from "./components/Charts";
import RecentEmployees from "./components/RecentEmployees";
import Notifications from "./components/Notifications";
import QuickActions from "./components/QuickActions";
import UpcomingEvents from "./components/UpcomingEvents";

function DashboardPage() {
    return (
        <>
            <WelcomeCard />

            <StatsCards />

            <Charts />

            <div className="bottom-grid">
                <RecentEmployees />
                <Notifications />
            </div>

            <div className="action-grid">
                <QuickActions />
                <UpcomingEvents />
            </div>
        </>
    );
}

export default DashboardPage;