import { createContext, useContext, useReducer, useEffect } from "react";

// Crea il context
const NotesContext = createContext();

// Reducer per gestire azioni
function notesReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.payload];
    case "DELETE_NOTE":
      return state.filter(note => note.id !== action.payload);
    case "EDIT_NOTE":
      return state.map(note =>
        note.id === action.payload.id ? action.payload : note
      );
    default:
      return state;
  }
}

export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, [], () => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
