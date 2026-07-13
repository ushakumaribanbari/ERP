import "./AttendanceHeader.css";
import { FaCalendarCheck, FaPlus } from "react-icons/fa";

function AttendanceHeader({ onMarkAttendance }) {
    const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
});
    return (
        <div className="attendance-header">

            <div className="header-left">
                <div className="header-icon">
                    <FaCalendarCheck />
                </div>

                <div>
                    <h1>Attendance</h1>
                    <p>
                        Monitor employee attendance and daily records.
                    </p>
                    <span className="attendance-date">
                        Today • {today}
                    </span>
                </div>
            </div>

            <button
                className="mark-btn"
                onClick={onMarkAttendance}
            >
                <FaPlus />
                Mark Attendance
            </button>

        </div>
    );
}

export default AttendanceHeader;