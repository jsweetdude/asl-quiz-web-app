import "./App.css";
import Navbar from "./components/Navbar";
import QuizWord from "./components/QuizWord";
import QuizMode from "./components/QuizMode";
import CategoriesToolbar from "./components/CategoriesToolbar";
import QuizResponses from "./components/QuizResponses";
import Modal from "./components/Modal.js";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import vocabularyList from "./data.js";
import { useEffect, useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export const savePreferencesToLocalStorage = (updatedProperties) => {
  const currentPreferences = loadPreferencesFromLocalStorage() || {};
  const newPreferences = { ...currentPreferences, ...updatedProperties };
  localStorage.setItem("userPreferences", JSON.stringify(newPreferences));
};

const loadPreferencesFromLocalStorage = () => {
  const storedPreferences = localStorage.getItem("userPreferences");
  return storedPreferences ? JSON.parse(storedPreferences) : null;
};

function App() {
  const [vocabulary, setVocabulary] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isStorageWarningModalOpen, setIsStorageWarningModalOpen] =
    useState(false);
  const [isEraseUserPrefsModalOpen, setIsEraseUserPrefsModalOpen] =
    useState(false);
  const [isRemoveWordModalOpen, setIsRemoveWordModalOpen] = useState(false);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  /* Modals Open/Close Functions */
  const closeStorageWarningModal = () => {
    setIsStorageWarningModalOpen(false);
  };
  const closeEraseUserPrefsModal = () => {
    setIsEraseUserPrefsModalOpen(false);
  };
  const toggleDevTools = () => {
    setIsDevToolsOpen(!isDevToolsOpen);
  };
  const fireRemoveWordWarning = () => {
    setIsRemoveWordModalOpen(true);
  };
  const closeRemoveWordModal = () => {
    setIsRemoveWordModalOpen(false);
  };

  /* Upload vocabulary list to Local Storage */
  const saveVocabularyToLocalStorage = (vocabularyList) => {
    localStorage.setItem("vocabulary", JSON.stringify(vocabularyList));
  };

  const loadVocabularyFromLocalStorage = () => {
    const storedVocabulary = localStorage.getItem("vocabulary");
    return storedVocabulary ? JSON.parse(storedVocabulary) : null;
  };

  useEffect(() => {
    const loadAndInitializeVocabulary = () => {
      let vocab = localStorage.getItem("vocabulary");
      if (!vocab) {
        vocab = vocabularyList; // Use default list if nothing in localStorage
        localStorage.setItem("vocabulary", JSON.stringify(vocab));
      } else {
        vocab = JSON.parse(vocab);
      }
      return vocab
        .filter((word) => !word.remove)
        .sort(() => 0.5 - Math.random());
    };

    const vocab = loadAndInitializeVocabulary();
    setVocabulary(vocab);
    if (vocab.length > 0) {
      setCurrentWord(vocab[0]); // Set the first word
    }

    // Load user preferences from local storage
    let preferences = loadPreferencesFromLocalStorage();
    if (preferences) {
      // Using correct property name based on your initial storage structure
      setIsStorageWarningModalOpen(!preferences.storageWarningDontShow);
    } else {
      // Initialize with default preferences if none found
      preferences = { storageWarningDontShow: false };
      savePreferencesToLocalStorage(preferences);
      setIsStorageWarningModalOpen(true);
    }
  }, []);

  // Create list of categories for Categories Toolbar
  const categoryList = Array.from(
    new Set(vocabularyList.map((word) => word.category))
  );

  // >>> potential improvement ::
  // Change this to component for Button, pass which button it is and group loalstorage calls and nextword function?
  const handleUserResponse = (type) => {
    const updatedVocabulary = vocabulary.map((word, index) => {
      if (index === currentIndex) {
        return { ...word, [type]: word[type] + 1 };
      }
      return word;
    });

    localStorage.setItem("vocabulary", JSON.stringify(updatedVocabulary)); // Update local storage
    setVocabulary(updatedVocabulary);
    console.log("updatedVocabulary", updatedVocabulary);
    console.log("vocabulary", vocabulary);

    nextWord();
  };

  const nextWord = () => {
    // Move to the next word
    const nextIndex = (currentIndex + 1) % vocabulary.length;
    setCurrentIndex(nextIndex);
    setCurrentWord(vocabulary[nextIndex]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <Modal
        isOpen={isStorageWarningModalOpen}
        modalType={"storageWarningModal"}
        closeModal={closeStorageWarningModal}
      />
      <Modal
        isOpen={isEraseUserPrefsModalOpen}
        modalType={"eraseUserPrefsLocalStorageModal"}
        closeModal={closeEraseUserPrefsModal}
      />
      <Modal
        isOpen={isRemoveWordModalOpen}
        modalType={"removeWordWarningModal"}
        closeModal={closeRemoveWordModal}
        currentWord={currentWord}
        nextWord={nextWord}
      />
      <main>
        <div className="top-container">
          <QuizMode />
          <QuizWord
            currentWord={currentWord}
            onClickRemoveWordModal={fireRemoveWordWarning}
          />
          <CategoriesToolbar categories={categoryList} />
        </div>
        <div className="bottom-container">
          <div className="d-grid gap-2 answer-buttons">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleUserResponse("mastered")}
            >
              Know It
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => handleUserResponse("needsPractice")}
            >
              Needs Practice
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleUserResponse("dontKnow")}
            >
              I Don't Know
            </button>
          </div>
        </div>
      </main>

      {/* Dev Tools Below */}

      <div className="dev-tools-container">
        <button
          className="btn btn-secondary"
          aria-expanded="false"
          onClick={toggleDevTools}
        >
          Developer Tools
          <FontAwesomeIcon
            icon={faCaretDown}
            className="ms-2"
            size="sm"
            inverse
          />
        </button>

        {isDevToolsOpen && (
          <ul className="dev-tools-list">
            <li>
              <button
                className="btn btn-light dev-tools-listitem"
                onClick={() => setIsEraseUserPrefsModalOpen(true)}
              >
                Erase User Preferences from Local Storage
              </button>
            </li>
            {/* <li>
            <a className="dropdown-item dev-tools-listitem" href="#">
              Another action
            </a>
          </li>*/}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
