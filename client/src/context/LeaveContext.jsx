import { createContext, useContext, useState } from "react";

const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {

    const [leaveData, setLeaveData] = useState([
        {
            id: 1,
            employee: "Shlok Gandhi",
            type: "Casual Leave",
            status: "Approved"
        },
        {
            id: 2,
            employee: "Rahul Sharma",
            type: "Sick Leave",
            status: "Pending"
        },
        {
            id: 3,
            employee: "Priya Patel",
            type: "Paid Leave",
            status: "Rejected"
        }
    ]);

    return (
        <LeaveContext.Provider
            value={{
                leaveData,
                setLeaveData
            }}
        >
            {children}
        </LeaveContext.Provider>
    );
};

export const useLeaves = () => {
    return useContext(LeaveContext);
};