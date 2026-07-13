import "./FinanceHeader.css";

function FinanceHeader({
    onExportReport,
    onAddTransaction
}){

    return(

        <div className="finance-header">

            <div>

                <h1>
                    Finance Management
                </h1>

                <p>
                    Track company revenue, expenses and profitability
                </p>

            </div>

            <div className="finance-header-actions">

                <button
    className="add-transaction-btn"
    onClick={onAddTransaction}
>
                    + Add Transaction
                </button>

                <button
                    className="export-report-btn"
                    onClick={onExportReport}
                >
                    Export Report
                </button>

            </div>

        </div>

    );

}

export default FinanceHeader;