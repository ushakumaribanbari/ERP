import "./SalaryModal.css";

function SalaryModal({

    open,

    onClose,

    formData,

    setFormData,

    onSave

}) {

    if (!open) return null;

    const netSalary =

        Number(formData.basicSalary || 0) +

        Number(formData.hra || 0) +

        Number(formData.bonus || 0) -

        Number(formData.deductions || 0);

    return (

        <div className="modal-overlay">

            <div className="salary-modal">

                <h2>
                    Generate Payroll
                </h2>

                <input
                    type="text"
                    placeholder="Employee Name"
                    value={formData.employee}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            employee:e.target.value
                        })
                    }
                />

                <select
                    value={formData.department}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            department:e.target.value
                        })
                    }
                >
                    <option>IT</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                </select>

                <input
                    type="number"
                    placeholder="Basic Salary"
                    value={formData.basicSalary}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            basicSalary:e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="HRA"
                    value={formData.hra}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            hra:e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Bonus"
                    value={formData.bonus}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            bonus:e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Deductions"
                    value={formData.deductions}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            deductions:e.target.value
                        })
                    }
                />

                <div className="net-salary-box">

                    Net Salary:
                    ₹{netSalary.toLocaleString()}

                </div>

                <div className="salary-actions">

                    <button
                        className="generate-btn"
                        onClick={onSave}
                    >
                        Generate Payroll
                    </button>

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    );

}

export default SalaryModal;