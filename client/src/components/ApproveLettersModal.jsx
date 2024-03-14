import React from "react";

function ApproveLettersModal({
  notApprovedLetters,
  setNotApprovedLetters,
  setShowAprrovedModal,
  setSubmittedNotes,
}) {
  const approveHandler = async (e, letterData) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:3001/api/letters/${letterData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isApproved: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData.messege);
      setSubmittedNotes((prev) => [letterData, ...prev]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }

    const updatedNotApprovedLetters = notApprovedLetters.filter((letter) => {
      return letter.id !== letterData.id;
    });
    setNotApprovedLetters(updatedNotApprovedLetters);
    if (updatedNotApprovedLetters.length === 0) {
      setShowAprrovedModal(false);
    }
  };
  return (
    <>
      <div
        className="approve-letters-modal wrapper flex center"
        onClick={() => setShowAprrovedModal(false)}
      >
        <div className="container flex column align-center">
          <h1>ממתינים לאישור..</h1>
          <div className="written flex column">
            <ul>
              {notApprovedLetters.map((letterData, index) => (
                <li className="note-container relative" key={index}>
                  <div>
                    <div className="flex column">
                      <div className="flex">
                        <h3 style={{ marginLeft: "5px" }}>
                          {letterData.firstName}
                        </h3>
                        <h3>{letterData.lastName}</h3>
                      </div>
                      <p>{letterData.letter}</p>
                    </div>
                  </div>
                  <button
                    className="update-btn absolute"
                    onClick={(e) => approveHandler(e, letterData)}
                  >
                    אישור
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApproveLettersModal;
