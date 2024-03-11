import React, { useState, useEffect } from "react";
import { dummyData } from "../../db.js";

const NotesSection = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [note, setNote] = useState("");
  const [submittedNotes, setSubmittedNotes] = useState(dummyData);

  useEffect(() => {
    const fetchLettersData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/letters");
        const responseData = await response.json();
        const approvedData = responseData.loadedLetters.filter((letter) => {
          return letter.isApproved;
        });
        setSubmittedNotes([...dummyData, ...approvedData]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLettersData();
  }, []);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const submitNote = async () => {
    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      note.trim() !== ""
    ) {
      const submittedData = {
        firstName: firstName,
        lastName: lastName,
        letter: note,
      };

      try {
        const response = await fetch(
          "http://localhost:3001/api/letters/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: submittedData.firstName,
              lastName: submittedData.lastName,
              letter: submittedData.letter,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }

      setFirstName("");
      setLastName("");
      setNote("");
    }
  };

  return (
    <section id="notes" className="notes-section">
      <h2 className="text-center">השאר מכתב</h2>
      <input
        type="text"
        value={firstName}
        placeholder="שם פרטי"
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        required
        type="text"
        value={lastName}
        placeholder="שם משפחה"
        onChange={(e) => setLastName(e.target.value)}
      />

      <textarea
        required
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
              <div className="flex">
                <h3 style={{ marginLeft: "5px" }}>{submittedData.firstName}</h3>
                <h3>{submittedData.lastName}</h3>
              </div>
              <p>{submittedData.letter}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NotesSection;
