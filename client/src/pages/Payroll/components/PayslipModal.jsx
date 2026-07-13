import "./PayslipModal.css";
import jsPDF from "jspdf";
function PayslipModal({

    open,

    onClose,

    payroll

}) {

    if (!open || !payroll)
        return null;


    const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Employee Payslip", 70, 20);

    doc.setFontSize(12);

    doc.text(`Employee: ${payroll.employee}`, 20, 50);
    doc.text(`Department: ${payroll.department}`, 20, 60);

    doc.text(
        `Basic Salary: ₹${payroll.basicSalary}`,
        20,
        80
    );

    doc.text(
        `HRA: ₹${payroll.hra}`,
        20,
        90
    );

    doc.text(
        `Bonus: ₹${payroll.bonus}`,
        20,
        100
    );

    doc.text(
        `Deductions: ₹${payroll.deductions}`,
        20,
        110
    );

    doc.text(
        `Net Salary: ₹${payroll.netSalary}`,
        20,
        130
    );

    doc.text(
        `Status: ${payroll.status}`,
        20,
        140
    );

    doc.text(
        `Generated On: ${new Date().toLocaleDateString()}`,
        20,
        150
    );

    doc.save(
        `${payroll.employee}_Payslip.pdf`
    );
};
    return (

        <div className="modal-overlay">

            <div className="payslip-modal">

                <div className="payslip-header">

                    <h2>
                        Salary Payslip
                    </h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="company-info">

                    <h3>
                        AICore System
                    </h3>

                    <p>
                        AI-Powered Enterprise Platform
                    </p>

                </div>

                <div className="payslip-details">

                    <p>
                        <b>Employee:</b>
                        {payroll.employee}
                    </p>

                    <p>
                        <b>Department:</b>
                        {payroll.department}
                    </p>

                    <p>
                        <b>Status:</b>
                        {payroll.status}
                    </p>

                </div>

                <hr />

                <div className="salary-breakdown">

                    <h3>
                        Earnings
                    </h3>

                    <div className="salary-row">
                        <span>Basic Salary</span>
                        <span>₹{payroll.basicSalary}</span>
                    </div>

                    <div className="salary-row">
                        <span>HRA</span>
                        <span>₹{payroll.hra}</span>
                    </div>

                    <div className="salary-row">
                        <span>Bonus</span>
                        <span>₹{payroll.bonus}</span>
                    </div>

                    <div className="salary-row deduction">
                        <span>Deductions</span>
                        <span>- ₹{payroll.deductions}</span>
                    </div>

                    <div className="salary-row total">
                        <span>Net Salary</span>
                        <span>
                            ₹{payroll.netSalary}
                        </span>
                    </div>

                </div>

                <div className="modal-actions">

    <button
        className="download-btn"
        onClick={downloadPDF}
    >
        Download PDF
    </button>

    <button
        className="close-btn"
        onClick={onClose}
    >
        Close
    </button>

</div>


            </div>

        </div>

    );

}

export default PayslipModal;