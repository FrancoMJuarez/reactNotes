import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "@mui/base/TextareaAutosize";

function Note({
  note,
  handleEditNote,
  handleDeleteNote,
  handleEditText,
  handleSaveNote,
}) {
  const inputRef = useRef(undefined);

  const handleEdit = () => {
    handleEditNote(note.id);
    setTimeout(() => inputRef.current.focus(), 1);
  };

  const handleDelete = () => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmation === true) {
      handleDeleteNote(note.id);
    }
  };

  const handleText = (e) => {
    handleEditText(note.id, e.target.value);
  };

  const handleSave = () => {
    handleSaveNote(note.id);
  };

  // Getting the date for the note and giving a format to it
  const auxDate = new Date(note.date);
  let date = auxDate.getDate();
  let month = auxDate.getMonth() + 1;
  let yyyy = auxDate.getFullYear();
  let hours = auxDate.getHours();
  let minutes = auxDate.getMinutes();
  let seconds = auxDate.getSeconds();

  if (date < 10) {
    date = `0${date}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  hours = hours > 12 ? hours - 12 : hours < 10 ? "0" + hours : hours;

  const finalDate = `${date}-${month}-${yyyy} ${hours}:${minutes}:${seconds} ${
    auxDate.getHours() > 12 ? "PM" : "AM"
  }`;

  return (
    <div className="note">
      <div className="note-header">
        <div className="date">{finalDate}</div>
        <div className="icons">
          {note.edit === true ? (
            <FaPencilAlt className="edit-icon" />
          ) : (
            <FaCheck className="check-icon" />
          )}
          <BsTrash className="close-icon" onClick={handleDelete} />
        </div>
      </div>
      {note.edit === true ? (
        <div className="note-body-edit">
          <TextareaAutosize
            ref={inputRef}
            value={note.text}
            onChange={handleText}
            onBlur={handleSave}
          />
        </div>
      ) : (
        <div className="note-body-read" onClick={handleEdit}>
          <ReactMarkdown children={note.text} />
        </div>
      )}
    </div>
  );
}

export default Note;
