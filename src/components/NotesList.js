import React from "react";
import Note from "./Note";

function NotesList({
  notes,
  handleEditNote,
  handleDeleteNote,
  handleEditText,
  handleSaveNote,
}) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          note={note}
          key={note.id}
          handleEditNote={handleEditNote}
          handleDeleteNote={handleDeleteNote}
          handleEditText={handleEditText}
          handleSaveNote={handleSaveNote}
        />
      ))}
    </div>
  );
}

export default NotesList;
