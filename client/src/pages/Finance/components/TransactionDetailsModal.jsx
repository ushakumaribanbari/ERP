import "./TransactionDetailsModal.css";

function TransactionDetailsModal({

    open,
    onClose,
    transaction

}){

    if(!open || !transaction)
        return null;

    return(

        <div className="modal-overlay">

            <div className="transaction-details-modal">

                <div className="modal-header">

                    <h2>
                        Transaction Details
                    </h2>

                    <button
                        className="close-modal-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="details-container">

                    <p>
                        <b>Transaction ID:</b>
                        {transaction.id}
                    </p>

                    <p>
                        <b>Description:</b>
                        {transaction.description}
                    </p>

                    <p>
                        <b>Category:</b>
                        {transaction.category}
                    </p>

                    <p>
                        <b>Amount:</b>
                        ₹{transaction.amount}
                    </p>

                    <p>
                        <b>Date:</b>
                        {transaction.date}
                    </p>

                    <p>
                        <b>Status:</b>
                        {transaction.status}
                    </p>

                </div>

            </div>

        </div>

    );

}

export default TransactionDetailsModal;