import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const QuizWord = ({ onClickRemoveWordModal, currentWord }) => {
  return (
    <div className="quiz-container">
      <button
        className="btn btn-dark remove-word-btn"
        onClick={onClickRemoveWordModal}
      >
        <FontAwesomeIcon icon={faTrash} className="" size="lg" inverse />
      </button>

      <h2>{currentWord ? currentWord.term : "Loading..."}</h2>
    </div>
  );
};

export default QuizWord;
