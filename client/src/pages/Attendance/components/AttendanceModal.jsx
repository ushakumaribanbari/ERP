import "./AttendanceModal.css";

function AttendanceModal({
    open,
    onClose,
    formData,
    setFormData,
    onSave,
    editingEmployee,
    employees
}) {

    if (!open) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (

        <div className="modal-overlay">

            <div className="attendance-modal">

                <div className="modal-header">

                    <h2>
    {editingEmployee ? "Edit Attendance" : "Mark Attendance"}
</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <div className="modal-body">

                    <div className="input-group">

    <label>Employee</label>

    <select
        name="employee"
        value={formData.employee}
        onChange={handleChange}
    >

        <option value="">
            Select Employee
        </option>

        {employees.map(emp => (

            <option
                key={emp.id}
                value={emp.name}
            >

                {emp.name} ({emp.id})

            </option>

        ))}

    </select>

</div>

                    <div className="two-column">

                        <div className="input-group">

                            <label>Date</label>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="input-group">

                            <label>Status</label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option>Present</option>
                                <option>Absent</option>
                                <option>Late</option>
                                <option>On Leave</option>

                            </select>

                        </div>

                    </div>

                    <div className="two-column">

                        <div className="input-group">

                            <label>Check In</label>

                            <input
                                type="time"
                                name="checkIn"
                                value={formData.checkIn}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="input-group">

                            <label>Check Out</label>

                            <input
                                type="time"
                                name="checkOut"
                                value={formData.checkOut}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="input-group">

                        <label>Remarks</label>

                        <textarea
                            rows="4"
                            name="remarks"
                            placeholder="Additional remarks..."
                            value={formData.remarks}
                            onChange={handleChange}
                        />

                    </div>

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
    {editingEmployee ? "Update Attendance" : "Save Attendance"}
</button>

                </div>

            </div>

        </div>

    );
}

export default AttendanceModal;