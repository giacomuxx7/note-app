import { useNotes } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/NotesList.module.css";

function NotesList() {
  const { notes, dispatch } = useNotes();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa nota?")) {
      dispatch({ type: "DELETE_NOTE", payload: id });
    }
  };

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = 
        categoryFilter === "" || note.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const priorityOrder = { "Alta": 1, "Media": 2, "Bassa": 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Le Tue Note</h2>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Cerca per titolo o contenuto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.select}
          >
            <option value="">Tutte le categorie</option>
            <option value="Personale">Personale</option>
            <option value="Studio">Studio</option>
            <option value="Lavoro">Lavoro</option>
          </select>
          
          <button 
            onClick={() => navigate("/create")}
            className={styles.createButton}
          >
            + Nuova Nota
          </button>
        </div>
      </div>

      <div className={styles.notesGrid}>
        {filteredNotes.length === 0 && (
          <p className={styles.emptyMessage}>Nessuna nota trovata 😢</p>
        )}
        
        {filteredNotes.map((note) => (
          <div 
            key={note.id} 
            className={styles.note}
            data-priority={note.priority}
          >
            <h3 className={styles.noteTitle}>{note.title}</h3>
            <p className={styles.noteText}>{note.text}</p>
            
            <div className={styles.noteMeta}>
              <span className={styles.noteCategory}>{note.category}</span>
              <span className={styles.notePriority}>
                {note.priority === "Alta" ? "🔥" : note.priority === "Media" ? "⚠️" : "🐢"} 
                {note.priority}
              </span>
            </div>
            
            <p className={styles.noteDate}>
              {new Date(note.createdAt).toLocaleDateString()}
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
                onClick={() => handleDelete(note.id)}
              >
                Elimina
              </button>
              <button 
                className={styles.detailsButton}
                onClick={() => navigate(`/note/${note.id}`)}
              >
                Dettagli
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;