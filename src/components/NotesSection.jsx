import React, { useState } from "react";
import { dummyData } from "../../db.js";

const NotesSection = () => {
  const [fullName, setFullName] = useState("");
  const [note, setNote] = useState("");
  const [submittedNotes, setSubmittedNotes] = useState(dummyData);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const submitNote = () => {
    if (fullName.trim() !== "" && note.trim() !== "") {
      const submittedData = {
        fullName: fullName,
        note: note,
      };

      // For now, log the submitted data. You can send it to the backend (MongoDB) later.
      console.log("Submitted Data:", submittedData);

      setSubmittedNotes([...submittedNotes, submittedData]);
      setFullName("");
      setNote("");
    }
  };

  return (
    <section id="notes" className="notes-section">
      <h2 className="text-center">השאר מכתב</h2>
      <input
        type="text"
        value={fullName}
        placeholder="שם מלא"
        onChange={handleFullNameChange}
      />

      <textarea
        placeholder="כתוב כאן..."
        value={note}
        onChange={handleNoteChange}
      />
      <div className="notes_button__wrapper">
        <button className="notes_button" onClick={submitNote}>
          שלח
        </button>
      </div>

      <div className="written flex column">
        <h2 className="text-center">רשמו עלי</h2>
        <ul className="flex justify-center wrap">
          {submittedNotes.map((submittedData, index) => (
            <li className="note-container" key={index}>
              <h3>{submittedData.fullName}:</h3>
              <p>{submittedData.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NotesSection;
