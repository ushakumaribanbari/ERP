import "./AttendanceFilters.css";
import { FaSearch, FaUndo } from "react-icons/fa";

function AttendanceFilters({
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter
}) {
    return (
        <div className="attendance-filters">

            {/* Search */}
            <div className="filter-group search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search employee..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Department */}
            <div className="filter-group">
                <select
    value={departmentFilter}
    onChange={(e) => setDepartmentFilter(e.target.value)}
>

    <option value="">All Departments</option>

    <option value="HR">HR</option>

    <option value="IT">IT</option>

    <option value="Finance">Finance</option>

    <option value="Marketing">Marketing</option>

    <option value="Sales">Sales</option>

    <option value="Operations">Operations</option>

</select>
            </div>

            {/* Status */}
            <div className="filter-group">
                <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
>

    <option value="">All Status</option>

    <option value="Present">Present</option>

    <option value="Absent">Absent</option>

    <option value="Late">Late</option>

    <option value="On Leave">On Leave</option>

</select>
            </div>

            {/* Date */}
            <div className="filter-group">
                <input
    type="date"
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
/>
            </div>

            {/* Reset */}
            <button
    className="reset-btn"
    onClick={() => {

        setSearchTerm("");

        setDepartmentFilter("");

        setStatusFilter("");

        setDateFilter("");

    }}
>
    <FaUndo />
    Reset
</button>

        </div>
    );
}

export default AttendanceFilters;