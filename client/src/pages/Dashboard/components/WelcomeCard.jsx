import "./WelcomeCard.css";
function WelcomeCard() {
  return (
    <div className="welcome-card">

      <div>
        <h1>Good Afternoon, Shlok 👋</h1>

        <p>
          Welcome back! Here's what's happening in your organization today.
        </p>
      </div>

      <div className="welcome-date">
        <h3>Friday</h3>
        <span>July 3, 2026</span>
      </div>

    </div>
  );
}

export default WelcomeCard;