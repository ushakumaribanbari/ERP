import "./ReportsTable.css";

function ReportsTable({ data }) {
    return (
        <div className="reports-table-card">
            <table className="reports-table">

                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Attendance</th>
                        <th>Leaves Taken</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.employee}</td>
                            <td>{item.department}</td>
                            <td>{item.attendance}</td>
                            <td>{item.leaves}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default ReportsTable;