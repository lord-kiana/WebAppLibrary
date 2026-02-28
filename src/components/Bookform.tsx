import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.ts";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;
    await addDoc(collection(db, "books"), { title, author, createdAt: serverTimestamp() });
    setTitle(""); setAuthor("");
  };

  const inputS = { width: "100%", padding: "12px", backgroundColor: "#000", border: "1px solid #27272a", borderRadius: "8px", color: "#fff", marginBottom: "15px" };

  return (
    <form onSubmit={handleSubmit}>
      <input style={inputS} placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input style={inputS} placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
        Add Book
      </button>
    </form>
  );
}