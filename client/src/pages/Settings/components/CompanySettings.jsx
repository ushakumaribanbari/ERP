import { useState } from "react";
import "./CompanySettings.css";

function CompanySettings() {
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
        alert("Company settings saved successfully!");
    };

    return (
        <div className="company-settings-card">
            <div className="company-settings-header">
                <h2>Company Settings</h2>
                <p>Manage your company information and branding.</p>
            </div>

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
                    <label>Company Email</label>
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
                    <label>Company Address</label>
                    <textarea
                        name="address"
                        rows="4"
                        value={companyData.address}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <button className="save-company-btn" onClick={handleSave}>
                Save Changes
            </button>
        </div>
    );
}

export default CompanySettings;