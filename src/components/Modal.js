import React from "react";
import { savePreferencesToLocalStorage } from "../App";

const Modal = ({ closeModal, modalType }) => {
  const modalContents = [
    {
      modalType: "storageWarningModal",
      title: "Data Warning",
      body: "Warning: This application is currently using Local Storage for user preferences and vocabulary progress. To avoid loss of data, do not clear your browser's cache or stored data. Later versions of the application will host data in a stable database.",
      ctas: ["Dismiss & Don't Show Again"],
      ctaTypes: ["primary"],
    },
    {
      modalType: "removeWordWarningModal",
      title: "Remove Word?",
      body: "You are about to remove this word from your rotation. You will never see it again. Are you sure?",
      ctas: ["Yes, I'm Sure", "Nevermind"],
      ctaTypes: ["danger", "secondary"],
    },
    {
      modalType: "eraseUserPrefsLocalStorageModal",
      title: "Erase User Preferences?",
      body: "You are about to delete user preferences from this application, such as 'dont show' settings. Are you sure you want to proceed?",
      ctas: ["Yes, I'm Sure", "Nevermind"],
      ctaTypes: ["danger", "secondary"],
    },
  ];

  const modalContent = modalContents.find(
    (modal) => modal.modalType === modalType
  );

  const closeDontShow = () => {
    const updatedPreferences = { storageWarningDontShow: true };
    savePreferencesToLocalStorage(updatedPreferences);
    closeModal();
  };

  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalContent.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>{modalContent.body}</p>
            </div>
            <div className="modal-footer">
              {modalContent.ctas.map((button, index) => {
                const btnClass = modalContent.ctaTypes[index];
                return (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-${btnClass}`}
                  >
                    {button}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
