import "./SystemPreferencesPage.css";
import { useState } from "react";

function SystemPreferencesPage() {
    const [preferences, setPreferences] = useState({
        language: "English",
        timezone: "Asia/Kolkata",
        currency: "INR",
        dateFormat: "DD/MM/YYYY",
        weekStart: "Monday"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPreferences({
            ...preferences,
            [name]: value
        });
    };

    const handleSave = () => {
        alert("System Preferences Saved Successfully!");
    };

    return (
        <div className="preferences-page">
            <div className="preferences-header">
                <h1>System Preferences</h1>
                <p>
                    Configure language, timezone, currency and regional settings.
                </p>
            </div>

            <div className="preferences-card">

                <div className="preferences-grid">

                    <div className="form-group">
                        <label>Language</label>
                        <select
                            name="language"
                            value={preferences.language}
                            onChange={handleChange}
                        >
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Gujarati</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Timezone</label>
                        <select
                            name="timezone"
                            value={preferences.timezone}
                            onChange={handleChange}
                        >
                            <option value="Asia/Kolkata">
                                India Standard Time (IST)
                            </option>
                            <option value="Europe/London">
                                Greenwich Mean Time (GMT)
                            </option>
                            <option value="America/New_York">
                                Eastern Standard Time (EST)
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Currency</label>
                        <select
                            name="currency"
                            value={preferences.currency}
                            onChange={handleChange}
                        >
                            <option value="INR">Indian Rupee (₹)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Date Format</label>
                        <select
                            name="dateFormat"
                            value={preferences.dateFormat}
                            onChange={handleChange}
                        >
                            <option>DD/MM/YYYY</option>
                            <option>MM/DD/YYYY</option>
                            <option>YYYY-MM-DD</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Week Starts On</label>
                        <select
                            name="weekStart"
                            value={preferences.weekStart}
                            onChange={handleChange}
                        >
                            <option>Monday</option>
                            <option>Sunday</option>
                        </select>
                    </div>

                </div>

                <button
                    className="save-btn"
                    onClick={handleSave}
                >
                    Save Preferences
                </button>

            </div>
        </div>
    );
}

export default SystemPreferencesPage;