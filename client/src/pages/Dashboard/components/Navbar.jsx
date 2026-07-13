import "./Navbar.css";

import { FaBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
    return (

        <header className="navbar">

            <div className="navbar-search">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search..."
                />

            </div>

            <div className="navbar-right">

                <button className="icon-btn">
                    <FaBell />
                </button>

                <button className="icon-btn">
                    <FaMoon />
                </button>

                <div className="profile">

                    <FaUserCircle size={34}/>

                    <div>

                        <h4>Shlok Gandhi</h4>

                        <p>Administrator</p>

                    </div>

                </div>

            </div>

        </header>

    );
}

export default Navbar;