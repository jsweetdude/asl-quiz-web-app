import React from "react";

const QuizResponses = () => {
  return (
    <>
      <div className="d-grid gap-2 answer-buttons">
        <button className="btn btn-success" type="button">
          Know It
        </button>
        <button className="btn btn-warning" type="button">
          Needs Practice
        </button>
        <button className="btn btn-danger" type="button">
          I Don't Know
        </button>
      </div>
    </>
  );
};

export default QuizResponses;
