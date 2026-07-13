import "./ExportButtons.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import {
    FaFilePdf,
    FaFileExcel,
    FaPrint
} from "react-icons/fa";

function ExportButtons({ reportData }) {

    const exportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("AICore System - Employee Report", 14, 20);

        doc.setFontSize(11);
        doc.text(
            `Generated on: ${new Date().toLocaleString()}`,
            14,
            30
        );

        autoTable(doc, {
            startY: 40,
            head: [[
                "Employee",
                "Department",
                "Attendance",
                "Leaves Taken"
            ]],
            body: reportData.map(employee => [
                employee.employee,
                employee.department,
                employee.attendance,
                employee.leaves
            ])
        });

        doc.save("employee-report.pdf");
    };

    const exportExcel = () => {

        const worksheetData = reportData.map(employee => ({
            Employee: employee.employee,
            Department: employee.department,
            Attendance: employee.attendance,
            "Leaves Taken": employee.leaves
        }));

        const worksheet =
            XLSX.utils.json_to_sheet(worksheetData);

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Employee Reports"
        );

        XLSX.writeFile(
            workbook,
            "employee-report.xlsx"
        );
    };

    const printReport = () => {
        window.print();
    };

    return (
        <div className="export-buttons">

            <button
                className="export-btn pdf"
                onClick={exportPDF}
            >
                <FaFilePdf />
                Export PDF
            </button>

            <button
                className="export-btn excel"
                onClick={exportExcel}
            >
                <FaFileExcel />
                Export Excel
            </button>

            <button
                className="export-btn print"
                onClick={printReport}
            >
                <FaPrint />
                Print
            </button>

        </div>
    );
}

export default ExportButtons;