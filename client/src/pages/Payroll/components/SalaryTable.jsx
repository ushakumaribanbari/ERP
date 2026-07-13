import "./SalaryTable.css";

function SalaryTable({

    payrollData = [],

    onView,

    onDelete

}) {

    return (

        <div className="salary-table-card">

            <div className="salary-table-header">

                <h2>Payroll Records</h2>

                <p>
                    Showing {payrollData.length} records
                </p>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Employee</th>

                        <th>Department</th>

                        <th>Basic Salary</th>

                        <th>HRA</th>

                        <th>Bonus</th>

                        <th>Deductions</th>

                        <th>Net Salary</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        payrollData.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="empty-payroll"
                                >
                                    No payroll generated yet
                                </td>

                            </tr>

                        )

                        :

                        (

                            payrollData.map((payroll) => (

                                <tr key={payroll.id}>

                                    <td>
                                        {payroll.employee}
                                    </td>

                                    <td>
                                        {payroll.department}
                                    </td>

                                    <td>
                                        ₹{payroll.basicSalary}
                                    </td>

                                    <td>
                                        ₹{payroll.hra}
                                    </td>

                                    <td>
                                        ₹{payroll.bonus}
                                    </td>

                                    <td>
                                        ₹{payroll.deductions}
                                    </td>

                                    <td className="net-salary">
                                        ₹{payroll.netSalary}
                                    </td>

                                    <td>

                                        <span className="paid-status">

                                            {payroll.status}

                                        </span>

                                    </td>

                                    <td className="salary-actions">

                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                onView(payroll)
                                            }
                                        >
                                            View
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                onDelete(payroll.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default SalaryTable;