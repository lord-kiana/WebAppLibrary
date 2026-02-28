import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import type { Book } from "../types";
import { useTheme } from "../useTheme";

interface Props {
  books: Book[];
  onEdit: (book: Book) => void;
}

export default function BookList({ books, onEdit }: Props) {
  const { isDarkMode } = useTheme();

  if (!books.length) return <p style={{ opacity: 0.6, textAlign: "center", color: isDarkMode ? "#fff" : "#000" }}>No books found.</p>;

  return (
    <div style={getWattpadGrid()}>
      {books.map((book) => (
        <div key={book.id} style={bookContainer}>
          <div style={getCoverWrapper(isDarkMode)}>
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
            <h4 style={getTitleStyle(isDarkMode)}>{book.Tittle}</h4>
            <p style={getAuthorStyle(isDarkMode)}>{book.Author}</p>
          </div>
          <button
            onClick={() => confirm("Delete this book?") && deleteDoc(doc(db, "books", book.id))}
            style={getDelBtn()}
          >
            Remove from Library
          </button>
        </div>
      ))}
    </div>
  );
}

// --- STYLES (dynamic based on theme) ---

const getWattpadGrid = () => ({
  display: "grid" as const,
  gridTemplateColumns: "repeat(auto-fill, minmax(clamp(120px, 25vw, 150px), 1fr))",
  gap: "clamp(16px, 4vw, 30px) clamp(12px, 3vw, 20px)",
  padding: "20px 0"
});

const bookContainer = { width: "100%", maxWidth: "150px" };

const getCoverWrapper = (isDarkMode: boolean) => ({
  position: "relative" as const,
  width: "100%",
  paddingBottom: "150%", // maintains 2:3 aspect ratio
  borderRadius: "8px",
  overflow: "hidden" as const,
  boxShadow: isDarkMode ? "0 8px 15px rgba(0,0,0,0.4)" : "0 8px 15px rgba(0,0,0,0.15)",
  backgroundColor: isDarkMode ? "#1a1a1c" : "#e8e8e8"
});

const coverImg = {
  position: "absolute" as const,
  top: 0,
  left: 0,
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
  backgroundColor: "rgba(59, 130, 246, 0.9)",
  color: "white",
  border: "none",
  cursor: "pointer",
  display: "flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  fontSize: "18px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  backdropFilter: "blur(4px)",
  transition: "transform 0.2s ease"
};

const textContainer = { marginTop: "12px" };

const getTitleStyle = (isDarkMode: boolean) => ({
  fontSize: "0.9rem",
  fontWeight: 700,
  margin: "0 0 2px 0",
  whiteSpace: "nowrap" as const,
  overflow: "hidden" as const,
  textOverflow: "ellipsis" as const,
  color: isDarkMode ? "#fff" : "#000"
});

const getAuthorStyle = (isDarkMode: boolean) => ({
  fontSize: "0.75rem",
  color: isDarkMode ? "#a1a1aa" : "#666666",
  margin: 0
});

const getDelBtn = () => ({
  marginTop: "4px",
  color: "#ef4444",
  background: "none",
  border: "none",
  cursor: "pointer" as const,
  fontSize: "0.7rem",
  textDecoration: "underline" as const
});