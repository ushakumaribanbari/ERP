import "./LeaveModal.css";

function LeaveModal({
    open,
    onClose,
    formData,
    setFormData,
    onSave,
    leaveTypes = []
}) {
    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="leave-modal">

                <div className="modal-header">
                    <h2>Apply Leave</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body">

                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={formData.employee}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                employee: e.target.value
                            })
                        }
                    />

                    <select
                        value={formData.type}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                type: e.target.value
                            })
                        }
                    >
                        {leaveTypes.map((type) => (
                            <option
                                key={type.id}
                                value={type.name}
                            >
                                {type.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={formData.from}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                from: e.target.value
                            })
                        }
                    />

                    <input
                        type="date"
                        value={formData.to}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                to: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Number of Days"
                        value={formData.days}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                days: e.target.value
                            })
                        }
                    />

                    <textarea
                        placeholder="Reason for Leave"
                        value={formData.reason}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                reason: e.target.value
                            })
                        }
                        rows="4"
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
                        Apply Leave
                    </button>

                </div>

            </div>
        </div>
    );
}

export default LeaveModal;