import "./PayrollFilters.css";
import { FaSearch, FaUndo } from "react-icons/fa";

function PayrollFilters({

    search,
    setSearch,

    department,
    setDepartment,

    status,
    setStatus,

    onReset

}) {

    return (

        <div className="payroll-filters">

            <div className="filter-search">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <select
                value={department}
                onChange={(e) =>
                    setDepartment(e.target.value)
                }
            >
                <option>All Departments</option>
                <option>HR</option>
                <option>IT</option>
                <option>Finance</option>
                <option>Marketing</option>
            </select>

            <select
                value={status}
                onChange={(e) =>
                    setStatus(e.target.value)
                }
            >
                <option>All Status</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Processing</option>
            </select>

            <button
                className="reset-payroll"
                onClick={onReset}
            >
                <FaUndo />
                Reset
            </button>

        </div>

    );
}

export default PayrollFilters;