import "./FinancePage.css";

import jsPDF from "jspdf";
import { useState } from "react";
import TransactionDetailsModal from "./components/TransactionDetailsModal";
import FinanceHeader from "./components/FinanceHeader";
import FinanceStats from "./components/FinanceStats";
import FinanceFilters from "./components/FinanceFilters";
import TransactionTable from "./components/TransactionTable";
import TransactionModal from "./components/TransactionModal";

function FinancePage(){



    const [search,setSearch] = useState("");
const [category,setCategory] = useState("All Categories");
const [status,setStatus] = useState("All Status");

const [transactions,setTransactions] = useState([

    {
        id:1,
        description:"July Payroll Processing",
        category:"Salary",
        amount:620000,
        date:"2026-07-01",
        status:"Paid"
    },

    {
        id:2,
        description:"Office Rent",
        category:"Infrastructure",
        amount:120000,
        date:"2026-07-03",
        status:"Paid"
    },

    {
        id:3,
        description:"Google Ads Campaign",
        category:"Marketing",
        amount:85000,
        date:"2026-07-05",
        status:"Pending"
    }

]);


const [selectedTransaction,setSelectedTransaction] =
useState(null);

const [openModal,setOpenModal] = useState(false);

const [formData,setFormData] = useState({

    description:"",

    category:"Salary",

    amount:"",

    date:"",

    status:"Paid"

});

const handleSaveTransaction = ()=>{

    const newTransaction = {

        id: Date.now(),

        description: formData.description,

        category: formData.category,

        amount: Number(formData.amount),

        date: formData.date,

        status: formData.status

    };

    setTransactions([
        ...transactions,
        newTransaction
    ]);

    setOpenModal(false);

    setFormData({

        description:"",

        category:"Salary",

        amount:"",

        date:"",

        status:"Paid"

    });

};

const filteredTransactions = transactions.filter((item)=>{

    const matchesSearch =
        item.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
        category === "All Categories"
        ||
        item.category === category;

    const matchesStatus =
        status === "All Status"
        ||
        item.status === status;




    
    return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
    );

});

const resetFilters = ()=>{

    setSearch("");
    setCategory("All Categories");
    setStatus("All Status");

};

const downloadFinanceReport = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
        "AICore System Financial Report",
        20,
        20
    );

    doc.setFontSize(12);

    doc.text(
        `Generated On: ${
            new Date().toLocaleString()
        }`,
        20,
        35
    );


    const totalRevenue = transactions
    .filter(t => t.status === "Paid")
    .reduce(
        (sum, t) => sum + t.amount,
        0
    );

const pendingPayments = transactions
    .filter(t => t.status === "Pending")
    .reduce(
        (sum, t) => sum + t.amount,
        0
    );

doc.text(
    `Total Revenue: ₹${totalRevenue.toLocaleString()}`,
    20,
    50
);

doc.text(
    `Pending Payments: ₹${pendingPayments.toLocaleString()}`,
    20,
    60
);



    doc.text(
        "Transactions:",
        20,
        80
    );

    doc.setFontSize(14);

doc.text("Description",20,85);
doc.text("Category",90,85);
doc.text("Amount",135,85);
doc.text("Status",170,85);

doc.line(20,88,190,88);

    let y = 95;

filteredTransactions.forEach((transaction) => {

    doc.text(
        transaction.description,
        20,
        y
    );

    doc.text(
        transaction.category,
        90,
        y
    );

    doc.text(
        `₹${transaction.amount.toLocaleString()}`,
        135,
        y
    );

    doc.text(
        transaction.status,
        170,
        y
    );

    y += 12;

    if(y > 270){
        doc.addPage();

        y = 20;
    }

});

    
    doc.save(
        "Finance_Report.pdf"
    );

};

const totalRevenue = transactions
    .filter(t => t.status === "Paid")
    .reduce((sum, t) => sum + t.amount, 0);

const totalExpenses = transactions
    .filter(t => t.category !== "Salary")
    .reduce((sum, t) => sum + t.amount, 0);

const netProfit = totalRevenue - totalExpenses;

const pendingPayments = transactions
    .filter(t => t.status === "Pending")
    .reduce((sum, t) => sum + t.amount, 0);

    return(

        <div className="finance-page">

            <FinanceHeader
    onAddTransaction={() =>
        setOpenModal(true)
    }

    onExportReport={downloadFinanceReport}
/>

            <FinanceStats
    revenue={totalRevenue}
    expenses={totalExpenses}
    profit={netProfit}
    pending={pendingPayments}
/>

            <FinanceFilters
    search={search}
    setSearch={setSearch}

    category={category}
    setCategory={setCategory}

    status={status}
    setStatus={setStatus}

    onReset={resetFilters}
/>

<TransactionTable

    transactions={filteredTransactions}

    onView={(transaction)=>
        setSelectedTransaction(transaction)
    }

    onDelete={(id)=>
        setTransactions(
            transactions.filter(
                item => item.id !== id
            )
        )
    }

/>

<TransactionModal

    open={openModal}

    onClose={()=>
        setOpenModal(false)
    }

    formData={formData}

    setFormData={setFormData}

    onSave={handleSaveTransaction}

/>


<TransactionDetailsModal

    open={selectedTransaction !== null}

    transaction={selectedTransaction}

    onClose={()=>
        setSelectedTransaction(null)
    }

/>
        </div>

    );

}

export default FinancePage;