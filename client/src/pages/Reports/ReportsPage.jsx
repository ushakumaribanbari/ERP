import "./ReportsPage.css";
import { useState } from "react";

import { useEmployees } from "../../context/EmployeeContext";
import { useLeaves } from "../../context/LeaveContext";
import ReportsHeader from "./components/ReportsHeader";
import ReportsStats from "./components/ReportsStats";
import ReportsFilters from "./components/ReportsFilters";
import ReportsCharts from "./components/ReportsCharts";
import ReportsTable from "./components/ReportsTable";
import ExportButtons from "./components/ExportButtons";
import { useAttendance } from "../../context/AttendanceContext";

function ReportsPage() {

    const { employees } = useEmployees();

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All Departments");
    const [status, setStatus] = useState("All Status");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const { attendanceData } = useAttendance();

    const { leaveData } = useLeaves();

    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        employee => employee.status === "Active"
    ).length;

    const inactiveEmployees = employees.filter(
        employee => employee.status === "Inactive"
    ).length;

    const presentEmployees = attendanceData.filter(
        item => item.status === "Present"
    ).length;

    const absentEmployees = attendanceData.filter(
        item => item.status === "Absent"
    ).length;

    const onLeaveEmployees = attendanceData.filter(
        item => item.status === "On Leave"
    ).length;

    const attendanceRate =
        totalEmployees > 0
            ? ((presentEmployees / totalEmployees) * 100).toFixed(1)
            : 0;

    const approvedLeaves = leaveData.filter(
        leave => leave.status === "Approved"
    ).length;

    const pendingLeaves = leaveData.filter(
        leave => leave.status === "Pending"
    ).length;

    const rejectedLeaves = leaveData.filter(
        leave => leave.status === "Rejected"
    ).length;

    const attendanceChartData = [
        {
            status: "Present",
            count: presentEmployees
        },
        {
            status: "Absent",
            count: absentEmployees
        },
        {
            status: "On Leave",
            count: onLeaveEmployees
        }
    ];

    const leaveChartData = [
        {
            name: "Approved",
            value: approvedLeaves
        },
        {
            name: "Pending",
            value: pendingLeaves
        },
        {
            name: "Rejected",
            value: rejectedLeaves
        }
    ];

    const monthlyTrendData = [
    {
        month: "Jan",
        attendance: 92,
        leaves: 4,
        employees: 95
    },
    {
        month: "Feb",
        attendance: 89,
        leaves: 6,
        employees: 98
    },
    {
        month: "Mar",
        attendance: 94,
        leaves: 5,
        employees: 102
    },
    {
        month: "Apr",
        attendance: 91,
        leaves: 8,
        employees: 107
    },
    {
        month: "May",
        attendance: 95,
        leaves: 3,
        employees: 112
    },
    {
        month: "Jun",
        attendance: 93,
        leaves: 4,
        employees: 118
    }
];

    const reportStats = {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        presentToday: presentEmployees,
        approvedLeaves,
        attendanceRate
    };

    const departmentCounts = employees.reduce((acc, employee) => {
        acc[employee.department] =
            (acc[employee.department] || 0) + 1;

        return acc;
    }, {});

    const departmentData = Object.entries(
        departmentCounts
    ).map(([name, value]) => ({
        name,
        value
    }));

    const reportData = attendanceData.map(record => ({
    employee: record.name,
    department: employees.find(
        emp =>
            `${emp.firstName} ${emp.lastName}` ===
            record.employee
    )?.department || "N/A",
    attendance: record.status,
    leaves: leaveData.filter(
        leave =>
            leave.employee === record.employee &&
            leave.status === "Approved"
    ).length,
    date: record.date
}));

    const filteredData = reportData.filter((employee) => {

        const matchesSearch =
    String(employee.employee || "")
        .toLowerCase()
        .includes(search.toLowerCase());

        const matchesDepartment =
            department === "All Departments" ||
            employee.department === department;

        const matchesStatus =
            status === "All Status" ||
            employee.attendance === status;

            const matchesDate =
    (!fromDate || employee.date >= fromDate) &&
    (!toDate || employee.date <= toDate);

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus &&
            matchesDate
        );
    });

    return (
        <div className="reports-page">

 <div className="reports-section">
                <ReportsHeader />
                </div>
<div className="reports-section">
                <ReportsStats stats={reportStats} />
                </div>

<div className="reports-section">
                <ReportsFilters
    search={search}
    setSearch={setSearch}
    department={department}
    setDepartment={setDepartment}
    status={status}
    setStatus={setStatus}
    fromDate={fromDate}
    setFromDate={setFromDate}
    toDate={toDate}
    setToDate={setToDate}
/>
</div>

<div className="reports-section">

                <ReportsTable data={filteredData} />
</div>

<div className="reports-section">
                <ReportsCharts
                    departmentData={departmentData}
                    attendanceData={attendanceChartData}
                    leaveChartData={leaveChartData}
                    monthlyTrendData={monthlyTrendData}
                />
                </div>
                
            

            <ExportButtons reportData={filteredData} />

        </div>
    );
}

export default ReportsPage;