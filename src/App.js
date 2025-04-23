import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import Layout from "./components/Layout/Layout";
import NotesList from "./pages/NotesList";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NoteDetail from "./pages/NoteDetail";
import About from "./pages/About";

function App() {
  return (
    <NotesProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<NotesList />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/note/:id" element={<NoteDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </NotesProvider>
  );
}

export default App;