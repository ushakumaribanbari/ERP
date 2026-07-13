import "./CompanySettingsPage.css";
import { useState } from "react";

function CompanySettingsPage() {
    const [companyData, setCompanyData] = useState({
        companyName: "AICore System",
        email: "admin@aicore.com",
        phone: "+91 9876543210",
        website: "",
        address: "Ahmedabad, Gujarat",
        gst: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCompanyData({
            ...companyData,
            [name]: value
        });
    };

    const handleSave = () => {
        alert("Company Settings Saved Successfully!");
    };

    return (
        <div className="company-page">
            <div className="company-header">
                <h1>Company Settings</h1>
                <p>Manage your organization information and branding.</p>
            </div>

            <div className="company-card">
                <div className="company-form-grid">

                    <div className="form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={companyData.companyName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={companyData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={companyData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Website</label>
                        <input
                            type="text"
                            name="website"
                            value={companyData.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>GST Number</label>
                        <input
                            type="text"
                            name="gst"
                            value={companyData.gst}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Address</label>
                        <textarea
                            rows="4"
                            name="address"
                            value={companyData.address}
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
    /*return (
    <div style={{ padding: "30px" }}>
        <h1>NEW COMPANY SETTINGS PAGE</h1>
        <p>If you can read this, the correct file is loaded.</p>
    </div>
);*/
}

export default CompanySettingsPage;

