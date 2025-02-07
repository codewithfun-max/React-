import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./style.css";

const App = () => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  const addOrUpdateNote = () => {
    if (text.trim()) {
      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = text;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setNotes([...notes, text]);
      }
      setText("");
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setText(notes[index]);
    setEditingIndex(index);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className={`container ${theme}`}>
     <button onClick={toggleTheme} className="toggle-theme">
  {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
</button>

      <div className="input-container">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="note-input" placeholder="Add you notes......"/>
        <button onClick={addOrUpdateNote} className="add-note">{editingIndex !== null ? "Update Note" : "Add Note"}</button>
      </div>
      <ul className="note-list">
        {currentNotes.map((note, index) => (
          <li key={index} className="note-item">
            {note}
            <div>
              <button onClick={() => editNote(index)} className="edit-note">Edit</button>
              <button onClick={() => deleteNote(index)} className="delete-note">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: Math.ceil(notes.length / notesPerPage) }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className="page-button">{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default App;
