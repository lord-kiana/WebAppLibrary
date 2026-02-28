import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import BookForm from "../components/Bookform";
import BookList from "../components/BookList";
import type { Book } from "../types";
import styles from "../Dashboard.module.css";
import { useTheme } from "../useTheme";


export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("Tittle", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book)));
    });
    return () => unsubscribe();
  }, []);

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.Tittle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  return (
    <div style={{ backgroundColor: isDarkMode ? "#0a0a0c" : "#ffffff", minHeight: "100vh", color: isDarkMode ? "#fff" : "#000000" }}>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "clamp(12px, 5vw, 40px) clamp(8px, 4vw, 20px)", boxSizing: "border-box" }}>
        <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 700, color: isDarkMode ? "#fff" : "#000000", margin: 0, flex: "1 1 100%" }}>
            Your <span style={{ color: "#3b82f6" }}>Library</span>
          </h1>
          <button
            onClick={handleAddClick}
            style={{
              padding: "clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px)",
              backgroundColor: "#3b82f6",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              fontSize: "clamp(0.875rem, 2vw, 1rem)"
            }}
          >
            + new Book
          </button>
        </header>

        <BookList books={filteredBooks} onEdit={handleEditClick} />

        {showForm && (
          <div className={styles.floatingPanel}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "1.2rem" }}>
                {selectedBook ? "Edit Book" : "Add Book"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "1.5rem" }}
              >
                ×
              </button>
            </div>

            <BookForm
              selectedBook={selectedBook}
              clearSelection={() => {
                setShowForm(false);
                setSelectedBook(null);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
