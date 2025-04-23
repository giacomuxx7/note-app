// EditNote.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import styles from "../styles/NoteForm.module.css";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, dispatch } = useNotes();

  const noteId = parseInt(id);
  const existingNote = notes.find((n) => n.id === noteId);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personale");
  const [priority, setPriority] = useState("Media");

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title || "");
      setText(existingNote.text || "");
      setCategory(existingNote.category || "Personale");
      setPriority(existingNote.priority || "Media");
    }
  }, [existingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || text.trim() === "") return;

    const updatedNote = {
      ...existingNote,
      title: title.trim(),
      text: text.trim(),
      category,
      priority,
    };

    dispatch({ type: "EDIT_NOTE", payload: updatedNote });
    navigate("/");
  };

  if (!existingNote) {
    return <p className={styles.notFound}>Nota non trovata 😢</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Modifica Nota</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="title">Titolo</label>
          <input
            id="title"
            type="text"
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
            Salva Modifiche
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

export default EditNote;