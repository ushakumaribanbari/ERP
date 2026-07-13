import "./TransactionTable.css";

function TransactionTable({

    transactions,
    onView,
    onDelete

}){

    return(

        <div className="transaction-card">

            <div className="transaction-header">

                <h2>
                    Transactions
                </h2>

                <p>
                    Showing {transactions.length} transactions
                </p>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        transactions.map((item)=>(

                            <tr key={item.id}>

                                <td>{item.id}</td>

                                <td>{item.description}</td>

                                <td>{item.category}</td>

                                <td>
                                    ₹{item.amount.toLocaleString()}
                                </td>

                                <td>{item.date}</td>

                                <td>{item.status}</td>

                                <td className="transaction-actions">

    <button
        className="view-btn"
        onClick={() => onView(item)}
    >
        View
    </button>

    <button
        className="delete-btn"
        onClick={() => onDelete(item.id)}
    >
        Delete
    </button>

</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TransactionTable;