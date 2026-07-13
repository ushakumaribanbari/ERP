import "./Notifications.css";

const notifications = [
  {
    title: "New Employee Joined",
    message: "Amit Shah joined the HR Department.",
    time: "5 min ago",
  },
  {
    title: "Payroll Generated",
    message: "Payroll for June has been generated.",
    time: "30 min ago",
  },
  {
    title: "Leave Request",
    message: "Priya Patel requested 2 days leave.",
    time: "1 hour ago",
  },
  {
    title: "Low Inventory Alert",
    message: "Laptop stock is running low.",
    time: "Today",
  },
];

function Notifications() {
  return (
    <div className="notifications-card">

      <div className="notifications-header">
        <h2>Recent Notifications</h2>
      </div>

      <div className="notifications-list">

        {notifications.map((item, index) => (
          <div key={index} className="notification-item">

            <div className="notification-dot"></div>

            <div className="notification-content">
              <h4>{item.title}</h4>
              <p>{item.message}</p>
            </div>

            <span>{item.time}</span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notifications;