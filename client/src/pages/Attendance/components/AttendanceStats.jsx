import "./AttendanceStats.css";
import {
    FaUserCheck,
    FaUserTimes,
    FaClock,
    FaUmbrellaBeach
} from "react-icons/fa";

const stats = [
    {
        title:"Present Today",
        value:142,
        percent:"94.7%",
        icon:<FaUserCheck />,
        color:"#16a34a"
    },
    {
        title:"Absent",
        value:8,
        percent:"5.3%",
        icon:<FaUserTimes />,
        color:"#dc2626"
    },
    {
        title:"Late Arrivals",
        value:12,
        percent:"8%",
        icon:<FaClock />,
        color:"#f59e0b"
    },
    {
        title:"On Leave",
        value:5,
        percent:"3%",
        icon:<FaUmbrellaBeach />,
        color:"#2563eb"
    }
];

function AttendanceStats() {

    return (
        <div className="attendance-stats">

            {
                stats.map((item,index)=>(
                    <div
                        className="stat-card"
                        key={index}
                    >

                        <div
                            className="stat-icon"
                            style={{background:item.color}}
                        >
                            {item.icon}
                        </div>

                        <div className="stat-content">

                            <h4>{item.title}</h4>

                            <h2>
                                {item.value}
                                <span className="employee-label"> Employees</span>
                            </h2>

                            <p className="attendance-percent">
                                {item.percent} of Workforce
                            </p>

                        </div>

                    </div>
                ))
            }

        </div>
    );
}

export default AttendanceStats;