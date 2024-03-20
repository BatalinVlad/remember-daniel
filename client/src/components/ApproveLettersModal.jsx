import React from "react";

function ApproveLettersModal({
  notApprovedLetters,
  setNotApprovedLetters,
  setShowAprrovedModal,
  setSubmittedNotes,
  deleteLetterHandler,
}) {
  console.log(notApprovedLetters);
  const approveHandler = async (e, letterData) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `https://remember-daniel-production.up.railway.app/api/letters/${letterData.id}`,
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

    updateNotApprovedLetters(letterData.id);
  };

  const updateNotApprovedLetters = (letterId) => {
    const updatedNotApprovedLetters = notApprovedLetters.filter((letter) => {
      return letter.id !== letterId;
    });
    setNotApprovedLetters(updatedNotApprovedLetters);
    if (updatedNotApprovedLetters.length === 0) {
      setShowAprrovedModal(false);
    }
  };

  return (
    <>
      <div
        className="approve-letters-modal wrapper z4 flex center"
        onClick={() => setShowAprrovedModal(false)}
      >
        <div className="container flex column align-center z5">
          <h1>ממתינים לאישור..</h1>
          <div className="written z1 flex column">
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
                  <div className="actions-btns absolute">
                    <button
                      className="update-btn"
                      onClick={(e) => approveHandler(e, letterData)}
                    >
                      אישור
                    </button>
                    <button
                      className="danger-btn initial"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLetterHandler(letterData.id);
                        updateNotApprovedLetters(letterData.id);
                      }}
                    >
                      סירוב
                    </button>
                  </div>
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
