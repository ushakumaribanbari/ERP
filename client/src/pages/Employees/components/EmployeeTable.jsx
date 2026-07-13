import "./EmployeeTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function EmployeeTable({
    employees = [],
    onEdit,
    onDelete
}) {
    return (
        <div className="employee-table-card">
            <div className="table-header">
                <div>
                    <h2>Employee Directory</h2>
                    <p>Showing {employees.length} employees</p>
                </div>
            </div>

            <table className="employee-table">
                <thead>
    <tr>
        <th></th>
        <th>Employee</th>
        <th>Department</th>
        <th>Email</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
</thead>

                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>

                                <td>
    <div className="employee-cell">

        <div className="avatar">
            {employee.firstName.charAt(0)}
            {employee.lastName.charAt(0)}
        </div>

        <div className="employee-info">

            <h4>
                {employee.firstName} {employee.lastName}
            </h4>

            <div className="role-chip">
    {employee.role}
</div>

            <span>{employee.id}</span>

        </div>

    </div>
</td>

                                <td>{employee.department}</td>

                                
                                <td>{employee.email}</td>

                                <td>
                                    <span
                                        className={`status ${employee.status
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                    >
                                        {employee.status === "Active" && "🟢"}
                                        {employee.status === "On Leave" && "🟡"}
                                        {employee.status === "Inactive" && "🔴"}

                                        {employee.status}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className="action-btn"
                                        onClick={() => onEdit(employee)}
                                        title="Edit Employee"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="action-btn delete"
                                        onClick={() => onDelete(employee.id)}
                                        title="Delete Employee"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
    <td colSpan="6">
        <div className="empty-state">

            <div className="empty-icon">
                👥
            </div>

            <h3>No Employees Found</h3>

            <p>
                Try changing your search or filters,
                <br />
                or click <strong>Add Employee</strong> to create your first employee.
            </p>

        </div>
    </td>
</tr>
                    )}
                </tbody>
            </table>

            <div className="table-pagination">

    <div className="pagination-info">

        Total Employees :

        <strong> {employees.length}</strong>

    </div>

</div>
        </div>
    );
}

export default EmployeeTable;