import "./ThemeSettingsPage.css";

function ThemeSettingsPage() {
    const theme = "light";

    const toggleTheme = () => {
        alert("Dark mode will be available in a future update.");
    };

    return (
        <div className="theme-page">
            <div className="theme-header">
                <h1>Theme Settings</h1>
                <p>Customize the appearance of your ERP system.</p>
            </div>

            <div className="theme-card">

                <div className="theme-option">
                    <div>
                        <h3>Current Theme</h3>
                        <p>
                            The current active theme is{" "}
                            <strong>{theme.toUpperCase()} MODE</strong>
                        </p>
                    </div>

                    <button
                        className="theme-btn"
                        onClick={toggleTheme}
                    >
                        Switch to Dark Mode
                    </button>
                </div>

                <div className="theme-preview-container">

                    <div className="preview-card light-preview">
                        <h3>Light Theme</h3>
                        <p>Clean and professional appearance.</p>
                    </div>

                    <div className="preview-card dark-preview">
                        <h3>Dark Theme</h3>
                        <p>Modern appearance for low-light environments.</p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ThemeSettingsPage;