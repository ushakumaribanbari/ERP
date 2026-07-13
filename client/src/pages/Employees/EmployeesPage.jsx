import "./EmployeesPage.css";
import { useState } from "react";
import toast from "react-hot-toast";
import EmployeeHeader from "./components/EmployeeHeader";
import EmployeeStats from "./components/EmployeeStats";
import EmployeeFilters from "./components/EmployeeFilters";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";
import { useEmployees } from "../../context/EmployeeContext";

function EmployeesPage() {
    const [openModal, setOpenModal] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        salary: "",
        joiningDate: "",
        status: "Active",
        gender: "Male",
        address: "",
    });

    const { employees, setEmployees } = useEmployees();
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    // Search & Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // Filter Employees
    const filteredEmployees = employees.filter((employee) => {
        const fullName =
            `${employee.firstName} ${employee.lastName}`.toLowerCase();

        const search = searchTerm.toLowerCase();

        const matchesSearch =
            fullName.includes(search) ||
            (employee.email || "").toLowerCase().includes(search)||
            (employee.id || "").toLowerCase().includes(search);

        const matchesDepartment =
            departmentFilter === "All" ||
            employee.department === departmentFilter;

        const matchesRole =
            roleFilter === "All" ||
            employee.role === roleFilter;

        const matchesStatus =
            statusFilter === "All" ||
            employee.status === statusFilter;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesRole &&
            matchesStatus
        );
    });
    const handleEdit = (employee) => {

    setSelectedEmployeeId(employee.id);

    setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone || "",
        department: employee.department,
        role: employee.role,
        salary: employee.salary || "",
        joiningDate: employee.joiningDate || "",
        status: employee.status,
        gender: employee.gender || "Male",
        address: employee.address || ""
    });

    setOpenModal(true);

};
const handleDelete = (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    setEmployees(
        employees.filter(emp => emp.id !== id)
    );
    toast.success("Employee deleted successfully!");
};
    const handleSave = () => {

    if (
        formData.firstName.trim() === "" ||
        formData.lastName.trim() === "" ||
        formData.email.trim() === ""
    ) {

        toast.error("Please fill all required fields.");

        return;

    }
    if (selectedEmployeeId) {

    setEmployees(
        employees.map((employee) =>
            employee.id === selectedEmployeeId
                ? {
                      ...employee,
                      ...formData
                  }
                : employee
        )
    );

    toast.success("Employee updated successfully!");

}
    else 
    {
    const newEmployee = {

        id: `EMP${String(employees.length + 1).padStart(3, "0")}`,

        firstName: formData.firstName,

        lastName: formData.lastName,

        email: formData.email,

        phone: formData.phone,

        department: formData.department,

        role: formData.role,

        salary: formData.salary,

        joiningDate: formData.joiningDate,

        status: formData.status,

        gender: formData.gender,

        address: formData.address

    };

    setEmployees([...employees, newEmployee]);
    toast.success("Employee added successfully!");
    }
    setFormData({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        department: "",

        role: "",

        salary: "",

        joiningDate: "",

        status: "Active",

        gender: "Male",

        address: ""

    });

    setSelectedEmployeeId(null);

    setOpenModal(false);

};
    return (
        <>
            <EmployeeHeader
    onAddEmployee={() => {

        setSelectedEmployeeId(null);

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            department: "",
            role: "",
            salary: "",
            joiningDate: "",
            status: "Active",
            gender: "Male",
            address: ""
        });

        setOpenModal(true);
    }}
/>

            <EmployeeStats employees={employees} />

            <EmployeeFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                departmentFilter={departmentFilter}
                setDepartmentFilter={setDepartmentFilter}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <EmployeeTable
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <EmployeeModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                isEditing={selectedEmployeeId !== null}
            />
        </>
    );
}

export default EmployeesPage;