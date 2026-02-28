import { useTheme } from "../useTheme";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function About() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const containerStyle = {
    backgroundColor: isDarkMode ? "#0a0a0c" : "#ffffff",
    color: isDarkMode ? "#fff" : "#000000",
    minHeight: "100vh",
    padding: 0,
  };

  const contentStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "clamp(12px, 5vw, 40px) clamp(8px, 4vw, 20px)",
    boxSizing: "border-box" as const,
  };

  const titleStyle = {
    fontSize: "clamp(2rem, 6vw, 3.5rem)",
    fontWeight: 700,
    marginBottom: "24px",
    color: isDarkMode ? "#fff" : "#000000",
  };

  const subtitleStyle = {
    fontSize: "clamp(1rem, 3vw, 1.5rem)",
    color: isDarkMode ? "#a1a1aa" : "#666666",
    marginBottom: "32px",
    fontWeight: 500,
  };

  const sectionStyle = {
    marginBottom: "40px",
    lineHeight: "1.8",
  };

  const sectionTitleStyle = {
    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
    fontWeight: 600,
    marginBottom: "16px",
    color: "#3b82f6",
  };

  const textStyle = {
    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
    marginBottom: "12px",
    color: isDarkMode ? "#d4d4d8" : "#333333",
  };

  const featureListStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  };

  const featureCardStyle = {
    padding: "20px",
    backgroundColor: isDarkMode ? "#121215" : "#f5f5f5",
    border: isDarkMode ? "1px solid #27272a" : "1px solid #e0e0e0",
    borderRadius: "12px",
    transition: "all 0.3s",
  };

  const buttonStyle = {
    marginTop: "32px",
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  };

  return (
    <div style={containerStyle}>
      <Navbar />

      <main style={contentStyle}>
        <h1 style={titleStyle}>
          About <span style={{ color: "#3b82f6" }}>Crud Library</span>
        </h1>

        <p style={subtitleStyle}>
          Your Personal Wattpad-Style Book Library Manager
        </p>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>What is Crud Library?</h2>
          <p style={textStyle}>
            Crud Library is a modern, intuitive web application designed for book enthusiasts who want to organize and manage their personal library. Whether you're an avid reader, a book collector, or just someone who loves keeping track of stories, our app makes it simple and beautiful.
          </p>
          <p style={textStyle}>
            Inspired by the minimalist design of Wattpad, Crud Library combines elegant aesthetics with powerful functionality to give you the ultimate book management experience.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Key Features</h2>
          <div style={featureListStyle}>
            <div style={featureCardStyle}>
              <h3 style={{ color: "#3b82f6", marginBottom: "8px" }}>📚 Easy Management</h3>
              <p style={{ ...textStyle, marginBottom: 0 }}>
                Add, edit, and delete books with just a few clicks. Manage your entire library from one beautiful dashboard.
              </p>
            </div>
            <div style={featureCardStyle}>
              <h3 style={{ color: "#3b82f6", marginBottom: "8px" }}>🌓 Dark Mode</h3>
              <p style={{ ...textStyle, marginBottom: 0 }}>
                Switch between dark and light themes to suit your preference and reading environment.
              </p>
            </div>
            <div style={featureCardStyle}>
              <h3 style={{ color: "#3b82f6", marginBottom: "8px" }}>📱 Mobile Ready</h3>
              <p style={{ ...textStyle, marginBottom: 0 }}>
                Fully responsive design that looks great on phones, tablets, and desktops.
              </p>
            </div>
            <div style={featureCardStyle}>
              <h3 style={{ color: "#3b82f6", marginBottom: "8px" }}>🔐 Secure</h3>
              <p style={{ ...textStyle, marginBottom: 0 }}>
                Your data is securely stored with Firebase authentication. Only you can access your library.
              </p>
            </div>
            <div style={featureCardStyle}>
              <h3 style={{ color: "#3b82f6", marginBottom: "8px" }}>⚡ Fast & Reliable</h3>
              <p style={{ ...textStyle, marginBottom: 0 }}>
                Built with React and modern web technologies for a smooth, responsive experience.
              </p>
            </div>
            <div style={featureCardStyle}>
              <h3 style={{ color: "#3b82f6", marginBottom: "8px" }}>🎨 Beautiful UI</h3>
              <p style={{ ...textStyle, marginBottom: 0 }}>
                Clean, intuitive interface inspired by Wattpad's elegant design philosophy.
              </p>
            </div>
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Why Choose Crud Library?</h2>
          <p style={textStyle}>
            <strong>Simple Yet Powerful:</strong> You don't need complicated features to manage a book collection. We've stripped away the unnecessary and focused on what matters.
          </p>
          <p style={textStyle}>
            <strong>For Everyone:</strong> Whether you're tech-savvy or prefer simplicity, Crud Library is designed to be intuitive for all users.
          </p>
          <p style={textStyle}>
            <strong>Always Available:</strong> Access your library anytime, anywhere. Your books follow you everywhere.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Get Started</h2>
          <p style={textStyle}>
            Ready to organize your reading? Create an account and start building your personal library today. It only takes a few seconds!
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Go to Dashboard
          </button>
        </section>

        <section style={{ ...sectionStyle, paddingTop: "40px", borderTop: isDarkMode ? "1px solid #27272a" : "1px solid #e0e0e0" }}>
          <h2 style={sectionTitleStyle}>Contact & Support</h2>
          <p style={textStyle}>
            Have questions? Found a bug? We'd love to hear from you. This is an open-source project built with passion by book lovers for book lovers.
          </p>
          <p style={textStyle}>
            <strong>Version:</strong> 1.0.0
          </p>
          <p style={textStyle}>
            <strong>Last Updated:</strong> March 2026
          </p>
        </section>
      </main>
    </div>
  );
}