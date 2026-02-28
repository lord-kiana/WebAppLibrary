import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import type { Book } from "../types";

interface Props {
  books: Book[];
  onEdit: (book: Book) => void;
}

export default function BookList({ books, onEdit }: Props) {

  if (!books.length) return <p style={{ opacity: 0.6, textAlign: "center" }}>No books found.</p>;

  return (
    <div style={wattpadGrid}>
      {books.map((book) => (
        <div key={book.id} style={bookContainer}>
          <div style={coverWrapper}>
            <img src={book.Image} alt={book.Tittle} style={coverImg} />
            <button
              onClick={() => onEdit(book)}
              style={floatingEditBtn}
              title="Edit Book"
            >
              ✎
            </button>
          </div>
          <div style={textContainer}>
            <h4 style={titleStyle}>{book.Tittle}</h4>
            <p style={authorStyle}>{book.Author}</p>
          </div>
          <button
            onClick={() => confirm("Delete this book?") && deleteDoc(doc(db, "books", book.id))}
            style={delBtn}
          >
            Remove from Library
          </button>
        </div>
      ))}
    </div>
  );
}

// --- STYLES ---

const wattpadGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "30px 20px",
  padding: "20px 0"
};

const bookContainer = { width: "150px" };

const coverWrapper = {
  position: "relative" as const,
  width: "150px",
  height: "225px", // Classic Wattpad Aspect Ratio
  borderRadius: "8px",
  overflow: "visible", // Allowed visible so the button can slightly pop out if needed
  boxShadow: "0 8px 15px rgba(0,0,0,0.4)",
  backgroundColor: "#1a1a1c"
};

const coverImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  borderRadius: "8px"
};

const floatingEditBtn = {
  position: "absolute" as const,
  bottom: "10px",
  right: "10px",
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  backgroundColor: "rgba(59, 130, 246, 0.9)", // Nice Blue
  color: "white",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  backdropFilter: "blur(4px)",
  transition: "transform 0.2s ease"
};

const textContainer = { marginTop: "12px" };

const titleStyle = {
  fontSize: "0.9rem",
  fontWeight: 700,
  margin: "0 0 2px 0",
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#fff"
};

const authorStyle = {
  fontSize: "0.75rem",
  color: "#a1a1aa",
  margin: 0
};

const delBtn = { marginTop: "4px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.7rem", textDecoration: "underline" };