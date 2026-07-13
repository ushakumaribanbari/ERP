import "./AttendanceTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";


function AttendanceTable({
    attendanceData,
    onDelete,
    onEdit,
    onSort,
    sortField,
    sortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    totalRecords,
    recordsPerPage,
    selectedRows,
    onSelectRow,
    onSelectAll
}){

    const getStatusClass = (status) => {
        switch (status) {
            case "Present":
                return "status present";
            case "Absent":
                return "status absent";
            case "Late":
                return "status late";
            case "On Leave":
                return "status leave";
            default:
                return "status";
        }
    };

    const calculateHours = (checkIn, checkOut) => {
    if (
        checkIn === "--" ||
        checkOut === "--" ||
        !checkIn ||
        !checkOut
    ) {
        return "--";
    }

    const start = new Date(`2000-01-01T${checkIn}`);
    const end = new Date(`2000-01-01T${checkOut}`);

    const diffMs = end - start;

    const hours = diffMs / (1000 * 60 * 60);

    return `${hours.toFixed(2)} hrs`;
};

    return (
        <div className="attendance-table-card">

            <div className="table-header">

                <div>
                    <h2>Attendance Records</h2>
                    <p>Showing {attendanceData.length} employees</p>
                </div>

            </div>

            <div className="table-wrapper">

                <table>

                                    <thead>

                                        <tr>

                <th>


                </th>

                                            <th
                    onClick={() => onSort("name")}
                    className="sortable"
                >

                    Employee

                    {sortField === "name" &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}

                </th>
                                            <th
                    onClick={() => onSort("id")}
                    className="sortable"
                >

                    ID

                    {sortField === "id" &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}

                </th>
                                            <th
                    onClick={() => onSort("department")}
                    className="sortable"
                >

                    Department

                    {sortField === "department" &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}

                </th>
                                            <th
                    onClick={() => onSort("checkIn")}
                    className="sortable"
                >

                    Check In

                    {sortField === "checkIn" &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}

                </th>
                                            <th
                    onClick={() => onSort("checkOut")}
                    className="sortable"
                >

                    Check Out

                    {sortField === "checkOut" &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}

                </th>
                                            <th
                    onClick={() => onSort("status")}
                    className="sortable"
                >

                    Status

                    {sortField === "status" &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}

                </th>
                                            <th
                    onClick={() => onSort("hours")}
                    className="sortable"
                >

                    Hours

                    {sortField === "hours" &&
                        (sortOrder === "asc" ? " ▲" : " ▼")}

                </th>
                                            <th>Actions</th>

                                        </tr>

                    </thead>

                    <tbody>

    {attendanceData.map((employee) => (

        <tr key={employee.id}>

            {/* Checkbox Column */}
            <td>

                <input
                    type="checkbox"
                    checked={selectedRows.includes(employee.id)}
                    onChange={() => onSelectRow(employee.id)}
                />

            </td>

            <td>{employee.name}</td>

            <td>{employee.id}</td>

            <td>{employee.department}</td>

            <td>{employee.checkIn}</td>

            <td>{employee.checkOut}</td>

            <td>
                <span className={getStatusClass(employee.status)}>
                    {employee.status}
                </span>
            </td>

            <td>
    {calculateHours(
        employee.checkIn,
        employee.checkOut
    )}
</td>

            <td className="actions">

                <button
                    className="edit-btn"
                    onClick={() => onEdit(employee)}
                >
                    <FaEdit />
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(employee.id)}
                >
                    <FaTrash />
                </button>

            </td>

        </tr>

    ))}

</tbody>

                </table>

            </div>

            <div className="pagination">

    <div className="pagination-info">

        Showing{" "}

        {(currentPage - 1) * recordsPerPage + 1}

        -

        {Math.min(
            currentPage * recordsPerPage,
            totalRecords
        )}

        {" "}of{" "}

        {totalRecords}

        Employees

    </div>

    <div className="pagination-buttons">

        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
        >
            Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (

            <button
                key={index}
                className={
                    currentPage === index + 1
                        ? "active-page"
                        : ""
                }
                onClick={() => setCurrentPage(index + 1)}
            >
                {index + 1}
            </button>

        ))}

        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
        >
            Next
        </button>

    </div>

</div>

        </div>
    );
}

export default AttendanceTable;