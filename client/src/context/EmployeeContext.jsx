import { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([
    {
        id: "EMP001",
        firstName: "Shlok",
        lastName: "Gandhi",
        email: "shlok@aicore.com",
        phone: "9876543210",
        department: "IT",
        role: "Admin",
        salary: "85000",
        joiningDate: "2025-01-15",
        status: "Active",
        gender: "Male",
        address: "Ahmedabad"
    },
    {
        id: "EMP002",
        firstName: "Rahul",
        lastName: "Sharma",
        email: "rahul@aicore.com",
        phone: "9876543211",
        department: "HR",
        role: "Manager",
        salary: "65000",
        joiningDate: "2025-02-10",
        status: "Active",
        gender: "Male",
        address: "Mumbai"
    },
    {
        id: "EMP003",
        firstName: "Priya",
        lastName: "Patel",
        email: "priya@aicore.com",
        phone: "9876543212",
        department: "Finance",
        role: "Accountant",
        salary: "60000",
        joiningDate: "2025-03-05",
        status: "Inactive",
        gender: "Female",
        address: "Surat"
    }
]);

    return (
        <EmployeeContext.Provider value={{ employees, setEmployees }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeeContext);