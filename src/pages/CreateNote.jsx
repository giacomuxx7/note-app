// CreateNote.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import styles from "../styles/NoteForm.module.css";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personale");
  const [priority, setPriority] = useState("Media");
  const navigate = useNavigate();
  const { dispatch } = useNotes();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || text.trim() === "") return;

    const newNote = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      title: title.trim(),
      text: text.trim(),
      category,
      priority,
    };

    dispatch({ type: "ADD_NOTE", payload: newNote });
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crea una Nuova Nota</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="title">Titolo</label>
          <input
            id="title"
            type="text"
            placeholder="Inserisci un titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="text">Contenuto</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Scrivi la tua nota qui..."
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="category">Categoria</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option>Personale</option>
            <option>Studio</option>
            <option>Lavoro</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="priority">Priorità</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={styles.select}
          >
            <option>Bassa</option>
            <option>Media</option>
            <option>Alta</option>
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>
            Salva
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={styles.cancelButton}
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;