import "./PayrollStats.css";

function PayrollStats() {

    const stats = [

        {
            title: "Total Payroll",
            value: "₹25,40,000",
            subtitle: "Monthly salary payout",
            color: "#2563eb"
        },

        {
            title: "Employees Paid",
            value: "128",
            subtitle: "Processed employees",
            color: "#16a34a"
        },

        {
            title: "Pending Payments",
            value: "12",
            subtitle: "Awaiting processing",
            color: "#dc2626"
        },

        {
            title: "Bonuses Paid",
            value: "₹2,10,000",
            subtitle: "This month",
            color: "#f59e0b"
        }

    ];

    return (

        <div className="payroll-stats">

            {

                stats.map((stat) => (

                    <div
                        className="payroll-stat-card"
                        key={stat.title}
                        style={{
                            borderTop: `5px solid ${stat.color}`
                        }}
                    >

                        <h3>{stat.title}</h3>

                        <h2>{stat.value}</h2>

                        <p>{stat.subtitle}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default PayrollStats;