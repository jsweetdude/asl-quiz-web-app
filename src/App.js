import "./App.css";
import Navbar from "./components/Navbar";
import QuizWord from "./components/QuizWord";
import QuizMode from "./components/QuizMode";
import CategoriesToolbar from "./components/CategoriesToolbar";
import QuizResponses from "./components/QuizResponses";
import Modal from "./components/Modal.js";
import "bootstrap/dist/css/bootstrap.css";
import vocabularyList from "./data.js";
import { useEffect, useState } from "react";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {
  const categoryList = Array.from(
    new Set(vocabularyList.map((word) => word.category))
  );

  // Save to local storage
  const saveToLocalStorage = (vocabularyList) => {
    localStorage.setItem("vocabulary", JSON.stringify(vocabularyList));
  };

  // Load from local storage
  const loadFromLocalStorage = () => {
    const storedVocabulary = localStorage.getItem("vocabulary");
    return storedVocabulary ? JSON.parse(storedVocabulary) : null;
  };

  // Example usage in your App component
  useEffect(() => {
    const storedVocabulary = loadFromLocalStorage();
    if (storedVocabulary) {
      // Set your state with this data
    } else {
      saveToLocalStorage(vocabularyList);
    }
  }, []);

  const [modalVisibility, setmodalVisibility] = useState(false);

  useEffect(() => {
    setmodalVisibility(true);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      {/* {modalVisibility && <Modal />} */}
      <Modal />
      <main>
        <div className="top-container">
          <QuizMode />
          <QuizWord />
          <CategoriesToolbar categories={categoryList} />
        </div>
        <div className="bottom-container">
          <QuizResponses />
        </div>
      </main>
    </div>
  );
}

export default App;
