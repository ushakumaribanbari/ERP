import "./PayrollPage.css";
import { useState } from "react";

import PayrollHeader from "./components/PayrollHeader";
import PayrollStats from "./components/PayrollStats";
import PayrollFilters from "./components/PayrollFilters";
import SalaryTable from "./components/SalaryTable";
import SalaryModal from "./components/SalaryModal";
import PayslipModal from "./components/PayslipModal";

function PayrollPage() {

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All Departments");
    const [status, setStatus] = useState("All Status");

    const [openModal, setOpenModal] = useState(false);
    const [selectedPayroll, setSelectedPayroll] = useState(null);

    const [formData, setFormData] = useState({
        employee: "",
        department: "IT",
        basicSalary: "",
        hra: "",
        bonus: "",
        deductions: ""
    });

    const [payrollData, setPayrollData] = useState([
        {
            id: 1,
            employee: "Shlok Gandhi",
            department: "IT",
            basicSalary: 50000,
            hra: 10000,
            bonus: 5000,
            deductions: 3000,
            netSalary: 62000,
            status: "Paid"
        },
        {
            id: 2,
            employee: "Rahul Sharma",
            department: "Finance",
            basicSalary: 45000,
            hra: 8000,
            bonus: 4000,
            deductions: 2000,
            netSalary: 55000,
            status: "Paid"
        }
    ]);

    const filteredPayroll = payrollData.filter((item) => {

        const matchesSearch =
            item.employee
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesDepartment =
            department === "All Departments"
            ||
            item.department === department;

        const matchesStatus =
            status === "All Status"
            ||
            item.status === status;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
        );
    });

    const resetFilters = () => {
        setSearch("");
        setDepartment("All Departments");
        setStatus("All Status");
    };

    const handleGeneratePayroll = () => {

        const netSalary =
            Number(formData.basicSalary || 0)
            +
            Number(formData.hra || 0)
            +
            Number(formData.bonus || 0)
            -
            Number(formData.deductions || 0);

        const newPayroll = {
            id: Date.now(),
            employee: formData.employee,
            department: formData.department,
            basicSalary: Number(formData.basicSalary),
            hra: Number(formData.hra),
            bonus: Number(formData.bonus),
            deductions: Number(formData.deductions),
            netSalary,
            status: "Paid"
        };

        setPayrollData([
            ...payrollData,
            newPayroll
        ]);

        setOpenModal(false);

        setFormData({
            employee: "",
            department: "IT",
            basicSalary: "",
            hra: "",
            bonus: "",
            deductions: ""
        });
    };

    return (

        <div className="payroll-page">

            <PayrollHeader
                onGeneratePayroll={() =>
                    setOpenModal(true)
                }
            />

            <PayrollStats payrollData={payrollData} />

            <PayrollFilters
                search={search}
                setSearch={setSearch}

                department={department}
                setDepartment={setDepartment}

                status={status}
                setStatus={setStatus}

                onReset={resetFilters}
            />

            <SalaryTable
                payrollData={filteredPayroll}

                onView={(record) =>
                    setSelectedPayroll(record)
                }

                onDelete={(id) =>
                    setPayrollData(
                        payrollData.filter(
                            item => item.id !== id
                        )
                    )
                }
            />

            <SalaryModal
                open={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
                formData={formData}
                setFormData={setFormData}
                onSave={handleGeneratePayroll}
            />

            <PayslipModal
                open={selectedPayroll !== null}
                payroll={selectedPayroll}
                onClose={() =>
                    setSelectedPayroll(null)
                }
            />

        </div>

    );
}

export default PayrollPage;