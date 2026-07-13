import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";

import {
    FaBuilding,
    FaUser,
    FaLock,
    FaPalette,
    FaBell,
    FaGlobe
} from "react-icons/fa";

function SettingsPage() {
    const navigate = useNavigate();

    const settingsSections = [
        {
            id: "company",
            title: "Company Settings",
            description: "Manage company information and branding.",
            icon: <FaBuilding />
        },
        {
            id: "profile",
            title: "Profile Settings",
            description: "Update personal profile information.",
            icon: <FaUser />
        },
        {
            id: "security",
            title: "Security Settings",
            description: "Password and authentication settings.",
            icon: <FaLock />
        },
        {
            id: "theme",
            title: "Theme Settings",
            description: "Customize application appearance.",
            icon: <FaPalette />
        },
        {
            id: "notifications",
            title: "Notification Settings",
            description: "Configure alerts and notifications.",
            icon: <FaBell />
        },
        {
            id: "preferences",
            title: "System Preferences",
            description: "Manage language, timezone and currency.",
            icon: <FaGlobe />
        }
    ];

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>System Settings</h1>
                <p>Manage your ERP configuration and preferences</p>
            </div>

            <div className="settings-grid">
                {settingsSections.map((section) => (
                    <div className="settings-card" key={section.id}>
                        <div className="settings-icon">
                            {section.icon}
                        </div>

                        <h3>{section.title}</h3>
                        <p>{section.description}</p>

                        <button
                            className="settings-btn"
                            onClick={() =>
                                navigate(`/settings/${section.id}`)
                            }
                        >
                            Configure
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SettingsPage;