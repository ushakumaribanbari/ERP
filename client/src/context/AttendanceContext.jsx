import { createContext, useContext, useState } from "react";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {

    const [attendanceData, setAttendanceData] = useState([
    {
        id: 1,
        name: "Shlok Gandhi",
        department: "IT",
        checkIn: "09:00",
        checkOut: "18:00",
        status: "Present"
    },
    {
        id: 2,
        name: "Rahul Sharma",
        department: "HR",
        checkIn: "09:15",
        checkOut: "18:05",
        status: "Present"
    },
    {
        id: 3,
        name: "Priya Patel",
        department: "Finance",
        checkIn: "--",
        checkOut: "--",
        status: "Absent"
    },
    {
        id: 4,
        name: "John Doe",
        department: "Development",
        checkIn: "--",
        checkOut: "--",
        status: "On Leave"
    }
]);

    return (
        <AttendanceContext.Provider
            value={{
                attendanceData,
                setAttendanceData
            }}
        >
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => {
    return useContext(AttendanceContext);
};