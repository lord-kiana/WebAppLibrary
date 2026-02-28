export default function BookList({ books, onDelete }: { books: any[], onDelete: (id: string) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
      {books.map(book => (
        <div key={book.id} style={{ backgroundColor: "#121215", border: "1px solid #27272a", borderRadius: "12px", padding: "20px" }}>
          <h4 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>{book.title}</h4>
          <p style={{ color: "#a1a1aa", fontSize: "0.9rem", margin: "0 0 15px 0" }}>{book.author}</p>
          <button 
            onClick={() => onDelete(book.id)}
            style={{ background: "none", border: "1px solid #ef4444", color: "#ef4444", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}