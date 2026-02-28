import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../useTheme";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        console.error("Error signing out: ", error);
        alert("Failed to log out. Please try again.");
      }
    }
  };

  const handleAbout = () => {
    alert("Crud Library - Your Personal Wattpad-Style Library v1.0");
  };

  // STYLES - now responsive to theme
  const navStyles: React.CSSProperties = {
    backgroundColor: isDarkMode ? "#0a0a0c" : "#ffffff",
    borderBottom: isDarkMode ? "1px solid #27272a" : "1px solid #e0e0e0",
    padding: "0.75rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  const logoStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.05em",
    cursor: "pointer"
  };

  const linkStyle: React.CSSProperties = { 
    color: isDarkMode ? "#a1a1aa" : "#666666", 
    textDecoration: "none", 
    fontSize: "0.9rem",
    cursor: "pointer",
    position: "relative",
    padding: "10px 0",
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: isDarkMode ? "#121215" : "#f5f5f5",
    border: isDarkMode ? "1px solid #27272a" : "1px solid #d0d0d0",
    borderRadius: "12px",
    padding: "8px",
    display: showDropdown ? "block" : "none",
    minWidth: "160px",
    zIndex: 200,
    boxShadow: isDarkMode ? "0 10px 25px rgba(0,0,0,0.5)" : "0 10px 25px rgba(0,0,0,0.1)",
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: "10px 12px",
    cursor: "pointer",
    color: isDarkMode ? "#e4e4e7" : "#333333",
    fontSize: "0.85rem",
    borderRadius: "6px",
    transition: "background 0.2s",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  return (
    <nav style={navStyles}>
      <div style={logoStyle} onClick={() => navigate("/dashboard")}>Crud Library .</div>

      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <span onClick={() => navigate("/dashboard")} style={linkStyle}>Dashboard</span>

        <div
          style={{ ...linkStyle, color: isDarkMode ? "#ffffff" : "#000000" }}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          Settings
          <div style={dropdownStyle}>
            <div
              style={dropdownItemStyle}
              onClick={toggleDarkMode}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "#27272a" : "#e0e0e0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <span>Dark Mode</span>
              <span style={{ fontSize: "10px", color: isDarkMode ? "#3b82f6" : "#71717a" }}>
                {isDarkMode ? "ON" : "OFF"}
              </span>
            </div>

            <div 
              style={dropdownItemStyle}
              onClick={handleAbout}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "#27272a" : "#e0e0e0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              About Us
            </div>

            <div style={{ height: "1px", backgroundColor: isDarkMode ? "#27272a" : "#d0d0d0", margin: "4px 0" }} />

            <div 
              style={{ ...dropdownItemStyle, color: "#ef4444" }}
              onClick={handleLogout}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "#450a0a" : "#ffe0e0"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              Log out
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;