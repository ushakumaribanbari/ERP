import "./TransactionModal.css";

function TransactionModal({

    open,
    onClose,

    formData,
    setFormData,

    onSave

}){

    if(!open)
        return null;

    return(

        <div className="modal-overlay">

            <div className="transaction-modal">

                <h2>
                    Add Transaction
                </h2>

                <input
                    type="text"
                    placeholder="Transaction Description"
                    value={formData.description}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            description:e.target.value
                        })
                    }
                />

                <select
                    value={formData.category}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            category:e.target.value
                        })
                    }
                >
                    <option>Salary</option>
                    <option>Infrastructure</option>
                    <option>Marketing</option>
                    <option>Utilities</option>
                    <option>Miscellaneous</option>
                </select>

                <input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            amount:e.target.value
                        })
                    }
                />

                <input
                    type="date"
                    value={formData.date}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            date:e.target.value
                        })
                    }
                />

                <select
                    value={formData.status}
                    onChange={(e)=>
                        setFormData({
                            ...formData,
                            status:e.target.value
                        })
                    }
                >
                    <option>Paid</option>
                    <option>Pending</option>
                    <option>Overdue</option>
                </select>

                <div className="transaction-actions">

                    <button
                        className="save-transaction-btn"
                        onClick={onSave}
                    >
                        Save Transaction
                    </button>

                    <button
                        className="cancel-transaction-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    );

}

export default TransactionModal;