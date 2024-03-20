import React, { useState, useEffect, useContext } from "react";
import ApproveLettersModal from "../components/ApproveLettersModal.jsx";
import { AuthContext } from "../context/auth-context.js";

const NotesSection = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [note, setNote] = useState("");
  const [submittedNotes, setSubmittedNotes] = useState([]);
  const [notApprovedLetters, setNotApprovedLetters] = useState([]);
  const [showAprrovedModal, setShowAprrovedModal] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchLettersData = async () => {
      try {
        const response = await fetch("https://remember-daniel-production.up.railway.app/api/letters");
        const responseData = await response.json();

        const approvedLettersData = [];
        const notApprovedLettersData = [];

        responseData.loadedLetters.forEach((letter) => {
          if (letter.isApproved) {
            approvedLettersData.push(letter);
          } else {
            notApprovedLettersData.push(letter);
          }
        });

        setNotApprovedLetters(notApprovedLettersData);
        setSubmittedNotes([...approvedLettersData]);
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
          "https://remember-daniel-production.up.railway.app/api/letters/create",
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

        const responseData = await response.json();
        setNotApprovedLetters([...notApprovedLetters, responseData.letter]);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }

      setFirstName("");
      setLastName("");
      setNote("");
    }
  };

  const deleteLetterHandler = async (lid) => {
    try {
      const response = await fetch(`https://remember-daniel-production.up.railway.app/api/letters/${lid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedLetters = submittedNotes.filter((letter) => {
        return letter.id !== lid;
      });

      setSubmittedNotes(updatedLetters);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <section id="notes" className="notes-section">
      {auth.isLoggedIn && notApprovedLetters.length > 0 && (
        <button
          className="danger-btn z4"
          onClick={() => setShowAprrovedModal((prev) => !prev)}
        >
          <h3>
            <small> {notApprovedLetters.length} </small>
            ממתינים לאישור
          </h3>
        </button>
      )}
      {showAprrovedModal && (
        <ApproveLettersModal
          setShowAprrovedModal={setShowAprrovedModal}
          notApprovedLetters={notApprovedLetters}
          setNotApprovedLetters={setNotApprovedLetters}
          setSubmittedNotes={setSubmittedNotes}
          deleteLetterHandler={deleteLetterHandler}
        />
      )}

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
          {submittedNotes.map((letter, index) => (
            <li className="note-container z2 relative" key={index}>
              <div className="flex">
                <h3 style={{ marginLeft: "5px" }}>{letter.firstName}</h3>
                <h3>{letter.lastName}</h3>
              </div>
              <p>{letter.letter}</p>
              {auth.isLoggedIn && (
                <button
                  className="danger-btn delete"
                  onClick={() => deleteLetterHandler(letter.id)}
                >
                  למחוק
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NotesSection;
