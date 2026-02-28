import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this path is correct
import Navbar from "../components/Navbar";
import BookForm from "../components/Bookform";
import BookList from "../components/BookList";

export default function Dashboard() {
  const [books, setBooks] = useState<any[]>([]);

  // REAL-TIME FETCH: Syncs with Firestore automatically
  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div style={{ backgroundColor: "#0a0a0c", minHeight: "100vh", color: "#ffffff" }}>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <header style={{ marginBottom: "50px" }}>
           <h1 style={{ fontSize: "2.5rem", letterSpacing: "-0.05em" }}>Your <span style={{ color: "#3b82f6" }}>Library</span></h1>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "50px", alignItems: "start" }}>
          {/* LEFT: ADD BOOK */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div style={{ backgroundColor: "#121215", border: "1px solid #27272a", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ marginTop: 0 }}>Add Book</h3>
              <BookForm />
            </div>
          </aside>

          {/* RIGHT: LIST BOOKS */}
          <section>
            <BookList books={books} />
          </section>
        </div>
      </main>
    </div>
  );
}