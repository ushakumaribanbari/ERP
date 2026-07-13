import "./SecuritySettingsPage.css";
import { useState } from "react";

function SecuritySettingsPage() {
    const [securityData, setSecurityData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactorAuth: false,
        sessionTimeout: "30"
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setSecurityData({
            ...securityData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSave = () => {
        if (securityData.newPassword !== securityData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Security settings updated successfully!");
    };

    return (
        <div className="security-page">
            <div className="security-header">
                <h1>Security Settings</h1>
                <p>Manage passwords, authentication and session security.</p>
            </div>

            <div className="security-card">

                <div className="security-form-grid">

                    <div className="form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={securityData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Session Timeout (minutes)</label>
                        <select
                            name="sessionTimeout"
                            value={securityData.sessionTimeout}
                            onChange={handleChange}
                        >
                            <option value="15">15 Minutes</option>
                            <option value="30">30 Minutes</option>
                            <option value="60">1 Hour</option>
                            <option value="120">2 Hours</option>
                        </select>
                    </div>

                </div>

                <div className="toggle-container">
                    <label className="toggle-label">
                        Enable Two-Factor Authentication
                    </label>

                    <input
                        type="checkbox"
                        name="twoFactorAuth"
                        checked={securityData.twoFactorAuth}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="save-btn"
                    onClick={handleSave}
                >
                    Save Security Settings
                </button>

            </div>
        </div>
    );
}

export default SecuritySettingsPage;