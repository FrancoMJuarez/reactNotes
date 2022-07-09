import { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import { IoMdAddCircle } from "react-icons/io";
import Footer from "./components/Footer";

function App() {
  const LOCAL_STORAGE_KEY = "react-markdown-list-notes";

  //Setting the states
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "# Hello, World!\n---\n\nThis is your first Markdown note. You can:\n* Click/Focus to edit\n* Click off/Blur to save\n* Add a new note  by clicking the plus sign above.\n* Delete this note\n",
      date: "6/1/2022",
      edit: false,
    },
  ]);

  //Loading the previous notes if these exist
  useEffect(() => {
    const storageNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageNotes) {
      setNotes(storageNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  //Function to create a new note
  const addNote = (note) => {
    const newDate = new Date();
    setNotes([
      {
        id: nanoid(),
        text: '# Hello World\n---\n```javascript\nconst text="Hello"\n```',
        date: newDate,
        edit: false,
      },
      ...notes,
    ]);
  };

  //Function to change a note to the edit state
  const editNote = (id) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            edit: true,
          };
        } else {
          return note;
        }
      })
    );
  };

  //Function to save the changues on a note
  const saveNote = (id) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            edit: false,
          };
        } else {
          return note;
        }
      })
    );
  };

  //Function to edit a current note
  const editText = (id, newText) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            text: newText,
          };
        } else {
          return note;
        }
      })
    );
  };

  //Function to edit a note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Markdown Notes</h1>
        <IoMdAddCircle className="add-icon" onClick={addNote} />
      </div>
      <NotesList
        notes={notes}
        handleEditNote={editNote}
        handleDeleteNote={deleteNote}
        handleEditText={editText}
        handleSaveNote={saveNote}
      />
      <Footer />
    </div>
  );
}

export default App;
