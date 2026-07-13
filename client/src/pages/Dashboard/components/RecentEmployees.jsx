import "./RecentEmployees.css";

const employees = [
  {
    id: 1,
    name: "Shlok Gandhi",
    department: "Development",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Amit Shah",
    department: "HR",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Priya Patel",
    department: "Finance",
    role: "Accountant",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Rahul Mehta",
    department: "Sales",
    role: "Executive",
    status: "Active",
  },
];

function RecentEmployees() {
  return (
    <div className="recent-employees">

      <div className="table-header">
        <h2>Recent Employees</h2>
        <button>View All</button>
      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((emp) => (

            <tr key={emp.id}>

              <td>{emp.name}</td>

              <td>{emp.department}</td>

              <td>{emp.role}</td>

              <td>
                <span
                  className={
                    emp.status === "Active"
                      ? "status-active"
                      : "status-leave"
                  }
                >
                  {emp.status}
                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentEmployees;