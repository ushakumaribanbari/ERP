import "./ReportsFilters.css";

function ReportsFilters({
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
    fromDate,
    setFromDate,
    toDate,
    setToDate
}) {
    return (
        <div className="reports-filters">

            <input
                type="text"
                placeholder="Search employee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            >
                <option>All Departments</option>
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
            </select>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option>All Status</option>
                <option>Present</option>
                <option>Absent</option>
                <option>On Leave</option>
            </select>

            {/* From Date */}
        <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
        />

        {/* To Date */}
        <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
        />

            <button
    onClick={() => {
        setSearch("");
        setDepartment("All Departments");
        setStatus("All Status");
    }}
>
    Reset Filters
</button>

        </div>
    );
}

export default ReportsFilters;