import "./PayrollHeader.css";

function PayrollHeader({
    onGeneratePayroll
}) {

    return (

        <div className="payroll-header">

            <div className="header-left">

                <h1>
                    Payroll Management
                </h1>

                <p>
                    Manage salaries, payslips, bonuses and employee compensation
                </p>

            </div>

            <div className="header-actions">

                <button
                    className="generate-payroll-btn"
                    onClick={onGeneratePayroll}
                >
                    + Generate Payroll
                </button>

            </div>

        </div>

    );

}

export default PayrollHeader;