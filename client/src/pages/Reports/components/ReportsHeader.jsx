import "./ReportsHeader.css";
import { FaChartLine } from "react-icons/fa";

function ReportsHeader() {
    return (
        <div className="reports-header">
            <div>
                <h1>Reports & Analytics</h1>
                <p>Monitor business performance and workforce insights</p>
            </div>

            <div className="header-icon">
                <FaChartLine />
            </div>
        </div>
    );
}

export default ReportsHeader;