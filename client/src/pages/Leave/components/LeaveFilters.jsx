import "./LeaveFilters.css";
import { FaSearch, FaUndo } from "react-icons/fa";


function LeaveFilters({

    search,
    setSearch,

    department,
    setDepartment,

    status,
    setStatus,

    type,
    setType,

    onReset

}) {


    return (

        <div className="leave-filters">


            <div className="filter-search">

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search employee..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

            </div>



            <select

                value={department}

                onChange={(e)=>setDepartment(e.target.value)}

            >

                <option>
                    All Departments
                </option>

                <option>
                    HR
                </option>

                <option>
                    IT
                </option>

                <option>
                    Finance
                </option>

                <option>
                    Marketing
                </option>

            </select>




            <select

                value={type}

                onChange={(e)=>setType(e.target.value)}

            >

                <option>
                    All Leave Types
                </option>

                <option>
                    Casual Leave
                </option>

                <option>
                    Sick Leave
                </option>

                <option>
                    Paid Leave
                </option>


            </select>




            <select

                value={status}

                onChange={(e)=>setStatus(e.target.value)}

            >

                <option>
                    All Status
                </option>

                <option>
                    Pending
                </option>

                <option>
                    Approved
                </option>

                <option>
                    Rejected
                </option>


            </select>




            <button

                className="reset-leave"

                onClick={onReset}

            >

                <FaUndo />

                Reset

            </button>



        </div>

    );

}


export default LeaveFilters;