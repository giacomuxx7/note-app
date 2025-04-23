// NoteDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import styles from "../styles/NoteDetail.module.css";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, dispatch } = useNotes();

  const noteId = parseInt(id);
  const note = notes.find((n) => n.id === noteId);

  const handleDelete = () => {
    if (window.confirm("Sei sicuro di voler eliminare questa nota?")) {
      dispatch({ type: "DELETE_NOTE", payload: noteId });
      navigate("/");
    }
  };

  if (!note) {
    return <p className={styles.notFound}>Nota non trovata 😢</p>;
  }

  const creationDate = new Date(note.createdAt).toLocaleString();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.text}>{note.text}</p>
      
      <p className={styles.info}>
        <strong>Categoria:</strong> {note.category}
      </p>
      
      <p className={styles.info}>
        <strong>Priorità:</strong> {note.priority}
      </p>
      
      <p className={styles.date}>
        <strong>Data creazione:</strong> {creationDate}
      </p>

      <div className={styles.buttonsContainer}>
        <button 
          className={styles.editButton}
          onClick={() => navigate(`/edit/${note.id}`)}
        >
          Modifica
        </button>
        
        <button 
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          Elimina
        </button>
        
        <button 
          className={styles.backButton}
          onClick={() => navigate("/")}
        >
          Torna Indietro
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;