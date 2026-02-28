import { useState } from "react";
import type { FormEvent } from "react"; // type-only
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      // Translate Firebase error codes into user-friendly messages
      if (typeof err === "object" && err && "code" in err) {
        const code = (err as { code?: string }).code;
        switch (code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("Invalid email or password.");
            break;
          case "auth/invalid-email":
            setError("Invalid email format.");
            break;
          default:
            setError("Login failed. Please try again.");
            console.error(err);
        }
      } else {
        setError("Login failed. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={login} className="form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "#ef4444", textAlign: "center" }}>{error}</p>}
        <button type="submit">Login</button>

        {/* Register link */}
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: "#007bff", textDecoration: "underline" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}