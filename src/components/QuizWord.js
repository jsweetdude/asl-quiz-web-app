import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";

const QuizWord = () => {
  return (
    <div className="quiz-container">
      <div className="img-container">
        <FontAwesomeIcon icon={faAppleWhole} size="10x" />
      </div>
      <h2>Apple</h2>
    </div>
  );
};

export default QuizWord;
