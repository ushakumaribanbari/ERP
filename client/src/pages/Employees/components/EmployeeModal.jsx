import "./EmployeeModal.css";

function EmployeeModal({
    open,
    onClose,
    formData,
    setFormData,
    onSave,
    isEditing
}) {

    if (!open) return null;

    return (
        <div className="modal-overlay">

            <div className="employee-modal">

                <div className="modal-header">

                    <h2>
                        {isEditing ? "Edit Employee" : "Add New Employee"}
                    </h2>

                    <button onClick={onClose}>✕</button>

                </div>

                <div className="modal-body">

                    {/* ================= PERSONAL INFORMATION ================= */}

                    <h3 className="form-section">
                        👤 Personal Information
                    </h3>

                    <div className="form-grid">

                        <input
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value,
                                })
                            }
                        />

                        <input
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value,
                                })
                            }
                        />

                        <input
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />

                        <input
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                })
                            }
                        />

                    </div>

                    {/* ================= EMPLOYMENT DETAILS ================= */}

                    <h3 className="form-section">
                        💼 Employment Details
                    </h3>

                    <div className="form-grid">

                        <select
                            value={formData.department}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    department: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Department</option>
                            <option value="Development">Development</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                        </select>

                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    role: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Accountant">Accountant</option>
                            <option value="Employee">Employee</option>
                            <option value="Intern">Intern</option>
                        </select>

                        <input
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    salary: e.target.value,
                                })
                            }
                        />

                        <input
                            type="date"
                            value={formData.joiningDate}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    joiningDate: e.target.value,
                                })
                            }
                        />

                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value,
                                })
                            }
                        >
                            <option>Active</option>
                            <option>On Leave</option>
                            <option>Inactive</option>
                        </select>

                        <select
                            value={formData.gender}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    gender: e.target.value,
                                })
                            }
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>

                    </div>

                    {/* ================= ADDRESS ================= */}

                    <h3 className="form-section">
                        📍 Address
                    </h3>

                    <textarea
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value,
                            })
                        }
                    />

                </div>

                <div className="modal-footer">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-btn"
                        onClick={onSave}
                    >
                        {isEditing ? "Update Employee" : "Save Employee"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EmployeeModal;