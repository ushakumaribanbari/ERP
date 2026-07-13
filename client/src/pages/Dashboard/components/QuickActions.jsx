import "./QuickActions.css";

function QuickActions() {

    const actions = [

        "Add Employee",

        "Generate Payroll",

        "Create Report",

        "Approve Leave",

        "Manage Inventory",

        "Send Notification"

    ];

    return (

        <div className="quick-card">

            <h2>Quick Actions</h2>

            <div className="quick-grid">

                {actions.map((action) => (

                    <button
                        key={action}
                        className="quick-btn"
                    >
                        {action}
                    </button>

                ))}

            </div>

        </div>

    );

}

export default QuickActions;