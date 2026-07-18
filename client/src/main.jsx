import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import "./print.css";

import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import { LeaveProvider } from "./context/LeaveContext";
import { ThemeProvider } from "./context/ThemeContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthProvider>

      <EmployeeProvider>

        <AttendanceProvider>

          <LeaveProvider>

            <ThemeProvider>

              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 2500,
                  style: {
                    background: "#ffffff",
                    color: "#1e293b",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    fontWeight: "600",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
                  },
                  success: {
                    iconTheme: {
                      primary: "#22c55e",
                      secondary: "#ffffff",
                    },
                  },
                }}
              />

              <App />

            </ThemeProvider>

          </LeaveProvider>

        </AttendanceProvider>

      </EmployeeProvider>

    </AuthProvider>

  </React.StrictMode>
);