import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import type { Book } from "../types";
import { useTheme } from "../useTheme";

type Props = {
  selectedBook: Book | null;
  clearSelection: () => void;
};

export default function BookForm({ selectedBook, clearSelection }: Props) {
  const [tittle, setTittle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const { isDarkMode } = useTheme();
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
        <label style={getLabelStyle(isDarkMode)}>Book Title</label>
        <input
          style={getInputStyle(isDarkMode)}
          placeholder="e.g. Harry Potter"
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
        />
      </div>

      <div style={inputGroup}>
        <label style={getLabelStyle(isDarkMode)}>Author Name</label>
        <input
          style={getInputStyle(isDarkMode)}
          placeholder="e.g. J.K. Rowling"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div style={inputGroup}>
        <label style={getLabelStyle(isDarkMode)}>Cover Image URL</label>
        <input
          style={getInputStyle(isDarkMode)}
          placeholder="Paste image link here..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button type="submit" style={submitBtnStyle}>
        {selectedBook ? "Save Changes" : "Publish Book"}
      </button>

      <button type="button" onClick={clearSelection} style={getCancelBtnStyle(isDarkMode)}>
        Maybe Later
      </button>
    </form>
  );
}

// --- STYLES (dynamic based on theme) ---

const inputGroup = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "5px"
};

const getLabelStyle = (isDarkMode: boolean) => ({
  fontSize: "0.75rem",
  color: isDarkMode ? "#71717a" : "#666666",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em"
});

const getInputStyle = (isDarkMode: boolean) => ({
  width: "100%",
  padding: "12px",
  backgroundColor: isDarkMode ? "#09090b" : "#f5f5f5",
  border: isDarkMode ? "1px solid #27272a" : "1px solid #d0d0d0",
  borderRadius: "8px",
  color: isDarkMode ? "#fff" : "#000",
  boxSizing: "border-box" as const,
});

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

const getCancelBtnStyle = (isDarkMode: boolean) => ({
  width: "100%",
  padding: "10px",
  backgroundColor: "transparent",
  color: isDarkMode ? "#71717a" : "#999999",
  border: "none",
  cursor: "pointer",
  fontSize: "0.9rem"
});