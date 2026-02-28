import React from 'react';

const Navbar = () => {
  const navStyles: React.CSSProperties = {
    backgroundColor: "#0a0a0c",
    borderBottom: "1px solid #27272a",
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
    letterSpacing: "-0.05em"
  };

  const linkStyle = { color: "#a1a1aa", textDecoration: "none", fontSize: "0.9rem" };

  return (
    <nav style={navStyles}>
      <div style={logoStyle}>SHELF.</div>
      <div style={{ display: "flex", gap: "24px" }}>
        <a href="#" style={linkStyle}>Dashboard</a>
        <a href="#" style={{ ...linkStyle, color: "#ffffff" }}>Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;