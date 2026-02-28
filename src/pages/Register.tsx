import { useState } from "react";
import type { FormEvent } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ success state
  const navigate = useNavigate();

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);

      // Immediately log out
      await signOut(auth);

      // Show success message
      setSuccess("Account created successfully! Redirecting to login...");

      // Wait 2 seconds before redirect
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Try logging in.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        default:
          setError("Registration failed. Please try again.");
          console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={register} className="form">
        <h2>Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}