import { useState, useEffect} from "react";

import "./AttendancePage.css";

import AttendanceHeader from "./components/AttendanceHeader";
import AttendanceStats from "./components/AttendanceStats";
import AttendanceFilters from "./components/AttendanceFilters";
import AttendanceTable from "./components/AttendanceTable";
import AttendanceModal from "./components/AttendanceModal";
import { useAttendance } from "../../context/AttendanceContext";

//import {AttendanceContext} from "../../context/AttendanceContext";

function AttendancePage() {

    const {
        attendanceData,
        setAttendanceData
    } = useAttendance();

    const [openModal, setOpenModal] = useState(false);

    const [editingEmployee, setEditingEmployee] = useState(null);

    const [formData, setFormData] = useState({
        employee: "",
        date: "",
        status: "Present",
        checkIn: "",
        checkOut: "",
        remarks: ""
    });

    const [deletedEmployee, setDeletedEmployee] = useState(null);

    const [showUndo, setShowUndo] = useState(false);

   
    const [selectedRows, setSelectedRows] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

const [departmentFilter, setDepartmentFilter] = useState("");

const [statusFilter, setStatusFilter] = useState("");

const [dateFilter, setDateFilter] = useState("");

const [sortField, setSortField] = useState("");

const [sortOrder, setSortOrder] = useState("asc");

const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 5;
    const employees = [
    {
        id: "EMP001",
        name: "John Doe",
        department: "HR"
    },
    {
        id: "EMP002",
        name: "Rahul Sharma",
        department: "IT"
    },
    {
        id: "EMP003",
        name: "Priya Patel",
        department: "Finance"
    },
    {
        id: "EMP004",
        name: "Anjali Mehta",
        department: "Marketing"
    },
    {
        id: "EMP005",
        name: "Amit Shah",
        department: "Operations"
    }
];


    useEffect(() => {

        if (showUndo) {

            const timer = setTimeout(() => {
                setShowUndo(false);
                setDeletedEmployee(null);
            }, 5000);

            return () => clearTimeout(timer);
        }

    }, [showUndo]);

    const filteredAttendance = attendanceData
    .filter((employee) => {

        const matchesSearch =
    (employee.name || "")
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase()) ||

    (employee.id || "")
        .toLowerCase()
        .includes((searchTerm || "").toLowerCase());

        const matchesDepartment =
    departmentFilter === "" ||
    (employee.department || "") === departmentFilter;

        const matchesStatus =
    statusFilter === "" ||
    (employee.status || "") === statusFilter;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
        );

    })
    
    
    .sort((a, b) => {

        if (!sortField) return 0;

        const valueA = a[sortField];
        const valueB = b[sortField];

        if (valueA < valueB)
            return sortOrder === "asc" ? -1 : 1;

        if (valueA > valueB)
            return sortOrder === "asc" ? 1 : -1;

        return 0;

    });

    const indexOfLastRecord = currentPage * recordsPerPage;

const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentAttendance = filteredAttendance.slice(
    indexOfFirstRecord,
    indexOfLastRecord
);

const totalPages = Math.ceil(
    filteredAttendance.length / recordsPerPage
);

    const handleDeleteAttendance = (id) => {

        const employee = attendanceData.find(emp => emp.id === id);

        setDeletedEmployee(employee);

        setAttendanceData(
            attendanceData.filter(emp => emp.id !== id)
        );

        setShowUndo(true);

    };

const handleEditAttendance = (employee) => {

    setEditingEmployee(employee);

    setFormData({
        employee: employee.name,
        date: "",
        status: employee.status,
        checkIn: employee.checkIn,
        checkOut: employee.checkOut,
        remarks: ""
    });

    setOpenModal(true);

};

    const handleUndo = () => {

        if (deletedEmployee) {

            setAttendanceData(prev => [
                ...prev,
                deletedEmployee
            ]);

            setDeletedEmployee(null);
            setShowUndo(false);

        }

    };

    const handleSelectRow = (id) => {

    if (selectedRows.includes(id)) {

        setSelectedRows(
            selectedRows.filter(row => row !== id)
        );

    } else {

        setSelectedRows([
            ...selectedRows,
            id
        ]);

    }

};

const handleSelectAll = () => {

    if (selectedRows.length === currentAttendance.length) {

        setSelectedRows([]);

    } else {

        setSelectedRows(
            currentAttendance.map(emp => emp.id)
        );

    }

};

    const handleBulkDelete = () => {

    const deletedItems = attendanceData.filter(emp =>
        selectedRows.includes(emp.id)
    );

    if (deletedItems.length === 0) return;

    setDeletedEmployee(deletedItems);

    setAttendanceData(
        attendanceData.filter(emp =>
            !selectedRows.includes(emp.id)
        )
    );

    setSelectedRows([]);

    setShowUndo(true);

};

    const handleBulkStatus = (status) => {

    setAttendanceData(
        attendanceData.map(emp =>

            selectedRows.includes(emp.id)

                ? {
                    ...emp,
                    status
                }

                : emp

        )
    );

    setSelectedRows([]);

};

    const handleSort = (field) => {

    if (sortField === field) {

        setSortOrder(
            sortOrder === "asc"
                ? "desc"
                : "asc"
        );

    } else {

        setSortField(field);

        setSortOrder("asc");

    }

};

    const calculateHours = (checkIn, checkOut) => {

    if (!checkIn || !checkOut) return "--";

    const checkInDate = new Date(`1970-01-01T${checkIn}`);
    const checkOutDate = new Date(`1970-01-01T${checkOut}`);

    const diff = checkOutDate - checkInDate;

    if (diff <= 0) return "--";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours}h ${minutes}m`;
};

    const handleSaveAttendance = () => {

    const hoursWorked = calculateHours(
        formData.checkIn,
        formData.checkOut
    );

    const selectedEmployee = employees.find(
        emp => emp.name === formData.employee
    );

    if (editingEmployee) {

        setAttendanceData(
            attendanceData.map(emp =>
                emp.id === editingEmployee.id
                    ? {
                        ...emp,
                        name: formData.employee,
                        department: selectedEmployee
                            ? selectedEmployee.department
                            : emp.department,
                        checkIn: formData.checkIn,
                        checkOut: formData.checkOut,
                        status: formData.status,
                        hours: hoursWorked
                    }
                    : emp
            )
        );

    } else {

        const newAttendance = {
            id: "EMP" + String(attendanceData.length + 1).padStart(3, "0"),
            name: formData.employee,
            department: selectedEmployee
                ? selectedEmployee.department
                : "",
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            status: formData.status,
            hours: hoursWorked
        };

        setAttendanceData([
            ...attendanceData,
            newAttendance
        ]);

    }

    setFormData({
        employee: "",
        date: "",
        status: "Present",
        checkIn: "",
        checkOut: "",
        remarks: ""
    });

    setEditingEmployee(null);

    setOpenModal(false);

};
    return (

        <div className="attendance-page">

            <AttendanceHeader
    onMarkAttendance={() => {
        setEditingEmployee(null);

        setFormData({
            employee: "",
            date: "",
            status: "Present",
            checkIn: "",
            checkOut: "",
            remarks: ""
        });

        setOpenModal(true);
    }}
/>

            <AttendanceStats />

            <AttendanceFilters
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}

    departmentFilter={departmentFilter}
    setDepartmentFilter={setDepartmentFilter}

    statusFilter={statusFilter}
    setStatusFilter={setStatusFilter}

    dateFilter={dateFilter}
    setDateFilter={setDateFilter}
/>


    {selectedRows.length > 0 && (

<div className="bulk-toolbar">

    <span>

        {selectedRows.length} Selected

    </span>

    <div>

        <button
            onClick={() =>
                handleBulkStatus("Present")
            }
        >
            Mark Present
        </button>

        <button
            onClick={() =>
                handleBulkStatus("Absent")
            }
        >
            Mark Absent
        </button>

        <button
            className="bulk-delete"
            onClick={handleBulkDelete}
        >
            Delete Selected
        </button>

    </div>

</div>

)}

            <AttendanceTable
    attendanceData={currentAttendance}
    onDelete={handleDeleteAttendance}
    onEdit={handleEditAttendance}
    onSort={handleSort}
    sortField={sortField}
    sortOrder={sortOrder}

    currentPage={currentPage}
    setCurrentPage={setCurrentPage}

    totalPages={totalPages}

    totalRecords={filteredAttendance.length}

    recordsPerPage={recordsPerPage}

    selectedRows={selectedRows}

    onSelectRow={handleSelectRow}

    onSelectAll={handleSelectAll}
/>

            <AttendanceModal
    open={openModal}
    onClose={() => {
        setOpenModal(false);
        setEditingEmployee(null);
    }}
    formData={formData}
    setFormData={setFormData}
    onSave={handleSaveAttendance}
    editingEmployee={editingEmployee}
    employees={employees}
/>

            {showUndo && (

                <div className="undo-snackbar">

                    Attendance deleted successfully.

                    <button onClick={handleUndo}>
                        Undo
                    </button>

                </div>

            )}

        </div>

    );
}

export default AttendancePage;