import "./NotificationPanel.css";

function NotificationPanel({ notifications }) {
    return (
        <div className="notification-card">

            <h2>Recent Notifications</h2>

            {
                notifications.length === 0 ? (
                    <p>No notifications available.</p>
                ) : (
                    notifications.map(notification => (
                        <div
                            key={notification.id}
                            className="notification-item"
                        >
                            <p>{notification.message}</p>
                            <span>{notification.time}</span>
                        </div>
                    ))
                )
            }

        </div>
    );
}

export default NotificationPanel;