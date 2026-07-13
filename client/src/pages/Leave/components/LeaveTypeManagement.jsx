import "./LeaveTypeManagement.css";
import { useState } from "react";

function LeaveTypeManagement({
    leaveTypes,
    setLeaveTypes
}) {

    const [openModal, setOpenModal] = useState(false);

    const [newType, setNewType] = useState("");
    const [newDays, setNewDays] = useState("");

    const addType = () => {

        if (!newType.trim() || !newDays) {
            alert("Please enter leave type and maximum days.");
            return;
        }

        const newLeaveType = {
            id: Date.now(),
            name: newType,
            days: Number(newDays)
        };

        setLeaveTypes([
            ...leaveTypes,
            newLeaveType
        ]);

        setNewType("");
        setNewDays("");
        setOpenModal(false);
    };

    const deleteType = (id) => {

        setLeaveTypes(
            leaveTypes.filter(
                item => item.id !== id
            )
        );

    };

    return (

        <div className="leave-type-card">

            <div className="leave-type-header">

                <h2>Leave Types</h2>

                <button
                    className="add-type-btn"
                    onClick={() => setOpenModal(true)}
                >
                    + Add Leave Type
                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Type</th>

                        <th>Maximum Days</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {leaveTypes.map((type) => (

                        <tr key={type.id}>

                            <td>{type.name}</td>

                            <td>{type.days} Days</td>

                            <td>

                                <button
                                    className="delete-type"
                                    onClick={() =>
                                        deleteType(type.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {openModal && (

                <div className="modal-overlay">

                    <div className="leave-type-modal">

                        <h3>Add Leave Type</h3>

                        <input
                            type="text"
                            placeholder="Leave Type Name"
                            value={newType}
                            onChange={(e) =>
                                setNewType(e.target.value)
                            }
                        />

                        <input
                            type="number"
                            placeholder="Maximum Days"
                            value={newDays}
                            onChange={(e) =>
                                setNewDays(e.target.value)
                            }
                        />

                        <div className="modal-actions">

                            <button
                                className="save-btn"
                                onClick={addType}
                            >
                                Save
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setOpenModal(false);
                                    setNewType("");
                                    setNewDays("");
                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default LeaveTypeManagement;