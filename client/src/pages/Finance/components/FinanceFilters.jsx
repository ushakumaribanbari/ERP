import "./FinanceFilters.css";
import { FaSearch, FaUndo } from "react-icons/fa";

function FinanceFilters({

    search,
    setSearch,

    category,
    setCategory,

    status,
    setStatus,

    onReset

}){

    return(

        <div className="finance-filters">

            <div className="filter-search">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search transaction..."
                    value={search}
                    onChange={(e)=>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <select
                value={category}
                onChange={(e)=>
                    setCategory(e.target.value)
                }
            >
                <option>All Categories</option>
                <option>Salary</option>
                <option>Infrastructure</option>
                <option>Marketing</option>
                <option>Utilities</option>
                <option>Miscellaneous</option>
            </select>

            <select
                value={status}
                onChange={(e)=>
                    setStatus(e.target.value)
                }
            >
                <option>All Status</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Overdue</option>
            </select>

            <button
                className="reset-finance"
                onClick={onReset}
            >
                <FaUndo />
                Reset
            </button>

        </div>

    );

}

export default FinanceFilters;