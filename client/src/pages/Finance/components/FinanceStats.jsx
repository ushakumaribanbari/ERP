import "./FinanceStats.css";

function FinanceStats({

    revenue,
    expenses,
    profit,
    pending

}){

    return(

        <div className="finance-stats">

            <div className="finance-card revenue">
                <h3>Total Revenue</h3>
                <h2>₹{revenue.toLocaleString()}</h2>
                <p>+12.5% this month</p>
            </div>

            <div className="finance-card expense">
                <h3>Total Expenses</h3>
                <h2>₹{expenses.toLocaleString()}</h2>
                <p>+5.2% this month</p>
            </div>

            <div className="finance-card profit">
                <h3>Net Profit</h3>
                <h2>₹{profit.toLocaleString()}</h2>
                <p>+18.3% this month</p>
            </div>

            <div className="finance-card pending">
                <h3>Pending Payments</h3>
                <h2>₹{pending.toLocaleString()}</h2>
                <p>8 invoices pending</p>
            </div>

        </div>

    );

}

export default FinanceStats;