import "./EmployeeHeader.css";

function EmployeeHeader({ onAddEmployee }) {
    return (

        <div className="employee-header">

            <div>

                <h1>Employees</h1>

                <p>
                    Manage employees, departments and roles.
                </p>

            </div>

            <button onClick={onAddEmployee}>

                + Add Employee

            </button>

        </div>

    );
}

export default EmployeeHeader;