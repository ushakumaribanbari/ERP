import "./ProfileSettingsPage.css";
import { useState } from "react";

function ProfileSettingsPage() {
    const [profileData, setProfileData] = useState({
        fullName: "Shlok Gandhi",
        email: "shlok@example.com",
        phone: "+91 9876543210",
        designation: "Administrator",
        department: "IT"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleSave = () => {
        alert("Profile updated successfully!");
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1>Profile Settings</h1>
                <p>Manage your personal profile information.</p>
            </div>

            <div className="profile-card">
                <div className="profile-form-grid">

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={profileData.designation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={profileData.department}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <button
                    className="save-btn"
                    onClick={handleSave}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default ProfileSettingsPage;