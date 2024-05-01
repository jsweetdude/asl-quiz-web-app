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

/*

Notes
- Add button to remove a word from rotation

On Load
* 'Start Quiz' button

On 'Mastered'
- First time - tooltip/etc reminding user that the word will no longer appear, that if they want to keep it in the run, they should instead press "Needs Practice"
* Increment .mastery by 1 in localstorage
* Show new word

On 'Needs Practice'
- First time - tooltip/etc - the word will stay in rotation. press this if you know the word but it still needs work; 'Don't know' if you don't know the word at all
* Increment .needsPractice by 1 in localstorage
* Show new word

On 'Don't Know'
- First time - tooltip/etc - the word will stay in rotation, and mastery will not increase
* Increment .dontKnow by 1 in localstorage
* Show new word

*/

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
  const [storageWarningModalVisibility, setStorageWarningModalVisibility] =
    useState(false);
  const [
    eraseUserPrefsLocalStorageModalVisibility,
    setEraseUserPrefsLocalStorageModalVisibility,
  ] = useState(false);
  const [devToolsVisibility, setDevToolsVisibility] = useState(false);

  const toggleDevTools = () => {
    setDevToolsVisibility(!devToolsVisibility);
  };

  useEffect(() => {
    // Load vocabulary list from local storage or initialize if not present
    const storedVocabulary = loadVocabularyFromLocalStorage();
    if (!storedVocabulary) saveVocabularyToLocalStorage(vocabularyList);

    // Load user preferences from local storage
    let preferences = loadPreferencesFromLocalStorage();
    if (preferences) {
      // Using correct property name based on your initial storage structure
      setStorageWarningModalVisibility(!preferences.storageWarningDontShow);
    } else {
      // Initialize with default preferences if none found
      preferences = { storageWarningDontShow: false };
      savePreferencesToLocalStorage(preferences);
      setStorageWarningModalVisibility(true);
    }
  }, []);

  const categoryList = Array.from(
    new Set(vocabularyList.map((word) => word.category))
  );

  const saveVocabularyToLocalStorage = (vocabularyList) => {
    localStorage.setItem("vocabulary", JSON.stringify(vocabularyList));
  };

  const loadVocabularyFromLocalStorage = () => {
    const storedVocabulary = localStorage.getItem("vocabulary");
    return storedVocabulary ? JSON.parse(storedVocabulary) : null;
  };

  const closeStorageWarningModal = () => {
    setStorageWarningModalVisibility(false);
  };
  const closeEraseUserPrefsModal = () => {
    setEraseUserPrefsLocalStorageModalVisibility(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      {storageWarningModalVisibility && (
        <Modal
          modalType={"storageWarningModal"}
          closeModal={closeStorageWarningModal}
        />
      )}
      {eraseUserPrefsLocalStorageModalVisibility && (
        <Modal
          modalType={"eraseUserPrefsLocalStorageModal"}
          closeModal={closeEraseUserPrefsModal}
        />
      )}
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

        {devToolsVisibility && (
          <ul className="dev-tools-list">
            <li>
              <button
                className="btn btn-light dev-tools-listitem"
                onClick={() =>
                  setEraseUserPrefsLocalStorageModalVisibility(true)
                }
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
