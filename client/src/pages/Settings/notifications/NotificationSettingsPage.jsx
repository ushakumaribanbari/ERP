import "./NotificationSettingsPage.css";
import { useState } from "react";

function NotificationSettingsPage() {
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        attendanceAlerts: true,
        leaveRequests: true,
        payrollUpdates: true,
        systemAnnouncements: false
    });

    const handleToggle = (e) => {
        const { name, checked } = e.target;

        setNotifications({
            ...notifications,
            [name]: checked
        });
    };

    const handleSave = () => {
        alert("Notification settings saved successfully!");
    };

    return (
        <div className="notification-page">
            <div className="notification-header">
                <h1>Notification Settings</h1>
                <p>
                    Configure alerts and notifications for your ERP system.
                </p>
            </div>

            <div className="notification-card">

                <div className="notification-item">
                    <div>
                        <h3>Email Notifications</h3>
                        <p>Receive notifications via email.</p>
                    </div>

                    <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={notifications.emailNotifications}
                        onChange={handleToggle}
                    />
                </div>

                <div className="notification-item">
                    <div>
                        <h3>Attendance Alerts</h3>
                        <p>Get alerts for attendance updates.</p>
                    </div>

                    <input
                        type="checkbox"
                        name="attendanceAlerts"
                        checked={notifications.attendanceAlerts}
                        onChange={handleToggle}
                    />
                </div>

                <div className="notification-item">
                    <div>
                        <h3>Leave Requests</h3>
                        <p>Receive leave approval notifications.</p>
                    </div>

                    <input
                        type="checkbox"
                        name="leaveRequests"
                        checked={notifications.leaveRequests}
                        onChange={handleToggle}
                    />
                </div>

                <div className="notification-item">
                    <div>
                        <h3>Payroll Updates</h3>
                        <p>Receive salary and payroll updates.</p>
                    </div>

                    <input
                        type="checkbox"
                        name="payrollUpdates"
                        checked={notifications.payrollUpdates}
                        onChange={handleToggle}
                    />
                </div>

                <div className="notification-item">
                    <div>
                        <h3>System Announcements</h3>
                        <p>Receive system maintenance announcements.</p>
                    </div>

                    <input
                        type="checkbox"
                        name="systemAnnouncements"
                        checked={notifications.systemAnnouncements}
                        onChange={handleToggle}
                    />
                </div>

                <button
                    className="save-btn"
                    onClick={handleSave}
                >
                    Save Notification Settings
                </button>

            </div>
        </div>
    );
}

export default NotificationSettingsPage;