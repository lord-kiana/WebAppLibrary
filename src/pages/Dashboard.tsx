import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import BookForm from "../components/Bookform";
import BookList from "../components/BookList";
import type { Book } from "../types"; // shared type definition


export default function Dashboard() {
 const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("Tittle", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book)));
    });
    return () => unsubscribe();
  }, []);

  const handleAddClick = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  return (
    <div style={{ backgroundColor: "#0a0a0c", minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            Your <span style={{ color: "#3b82f6" }}>Library</span>
          </h1>
          <button
            onClick={handleAddClick}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3b82f6",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
            }}
          >
            + new Book
          </button>
        </header>

        <BookList books={books} onEdit={handleEditClick} />

        {showForm && (
          <div style={floatingPanelStyle}>
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

const floatingPanelStyle = {
  position: "fixed" as const,
  top: "100px",
  right: "40px",
  width: "350px",
  backgroundColor: "#121215",
  border: "1px solid #27272a",
  borderRadius: "20px",
  padding: "24px",
  zIndex: 999,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};