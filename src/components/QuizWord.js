import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const QuizWord = ({ modalType }) => {
  const [removeWordWarningVisibility, setRemoveWordWarningVisibility] =
    useState(false);

  const closeModal = () => {
    setRemoveWordWarningVisibility(false);
  };

  const fireRemoveWordWarning = () => {
    console.log("fired");
    setRemoveWordWarningVisibility(true);
  };

  return (
    <div className="quiz-container">
      <button
        className="btn btn-dark remove-word-btn"
        onClick={fireRemoveWordWarning}
      >
        <FontAwesomeIcon icon={faTrash} className="" size="lg" inverse />
      </button>

      {removeWordWarningVisibility && (
        <Modal modalType={"removeWordWarningModal"} closeModal={closeModal} />
      )}

      <h2>Apple</h2>
    </div>
  );
};

export default QuizWord;
