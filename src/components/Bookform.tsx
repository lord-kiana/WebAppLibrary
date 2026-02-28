import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import type { Book } from "../types";

type Props = {
  selectedBook: Book | null;
  clearSelection: () => void;
};

export default function BookForm({ selectedBook, clearSelection }: Props) {
  const [tittle, setTittle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  
  // When selectedBook changes (open form for edit), populate fields
  useEffect(() => {
    // defer updates to avoid React warning about synchronous state changes inside effects
    const timer = setTimeout(() => {
      if (selectedBook) {
        setTittle(selectedBook.Tittle);
        setAuthor(selectedBook.Author);
        setImage(selectedBook.Image);
      } else {
        setTittle("");
        setAuthor("");
        setImage("");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [selectedBook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!tittle || !author || !image) {
      alert("Please fill in the Title, Author, and Image URL");
      return;
    }

    try {
      if (selectedBook) {
        // update existing document
        await updateDoc(doc(db, "books", selectedBook.id), {
          Tittle: tittle,
          Author: author,
          Image: image,
          Published: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "books"), {
          Tittle: tittle,
          Author: author,
          Image: image,
          Published: serverTimestamp(), // current time
          createdAt: serverTimestamp(),
        });
      }

      // Reset form and close panel
      setTittle("");
      setAuthor("");
      setImage("");
      clearSelection();
    } catch (error) {
      console.error("Error saving book: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h3 style={{ margin: "0 0 10px 0", color: "#3b82f6" }}>
        {selectedBook ? "Edit Book" : "Add New Book"}
      </h3>

      <div style={inputGroup}>
        <label style={labelStyle}>Book Title</label>
        <input
          style={inputStyle}
          placeholder="e.g. Harry Potter"
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
        />
      </div>

      <div style={inputGroup}>
        <label style={labelStyle}>Author Name</label>
        <input
          style={inputStyle}
          placeholder="e.g. J.K. Rowling"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div style={inputGroup}>
        <label style={labelStyle}>Cover Image URL</label>
        <input
          style={inputStyle}
          placeholder="Paste image link here..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button type="submit" style={submitBtnStyle}>
        {selectedBook ? "Save Changes" : "Publish Book"}
      </button>

      <button type="button" onClick={clearSelection} style={cancelBtnStyle}>
        Maybe Later
      </button>
    </form>
  );
}

// --- STYLES ---

const inputGroup = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "5px"
};

const labelStyle = {
  fontSize: "0.75rem",
  color: "#71717a",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#09090b",
  border: "1px solid #27272a",
  borderRadius: "8px",
  color: "#fff",
  boxSizing: "border-box" as const,
};

const submitBtnStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "10px",
  boxShadow: "0 4px 10px rgba(59, 130, 246, 0.2)"
};

const cancelBtnStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "transparent",
  color: "#71717a",
  border: "none",
  cursor: "pointer",
  fontSize: "0.9rem"
};