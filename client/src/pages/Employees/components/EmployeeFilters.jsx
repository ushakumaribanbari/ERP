import "./EmployeeFilters.css";

function EmployeeFilters({
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
}) {
    return (
        <div className="employee-filters">
            <input
                type="text"
                placeholder="Search by Name, Email or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
            >
                <option value="All">All Departments</option>
                <option value="Development">Development</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
            </select>

            <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
            >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Accountant">Accountant</option>
                <option value="Employee">Employee</option>
            </select>

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
            </select>
        </div>
    );
}

export default EmployeeFilters;