import "./Navbar.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {

    const navigate = useNavigate();
const { logout } = useAuth();

const handleLogout = () => {
    logout();          // Clears token & auth state
    navigate("/login");
};
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

                <button
    className="logout-btn"
    onClick={handleLogout}
    title="Logout"
>
    <FaSignOutAlt />
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