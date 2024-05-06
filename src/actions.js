// const closeDontShow = () => {
//   const updatedPreferences = { storageWarningDontShow: true };
//   savePreferencesToLocalStorage(updatedPreferences);
//   closeModal();
// };
// const closeRemoveWord = () => {
//   const storedVocabularyString = localStorage.getItem("vocabulary");
//   const storedVocabulary = storedVocabularyString
//     ? JSON.parse(storedVocabularyString)
//     : [];

//   const index = storedVocabulary.findIndex(
//     (word) => word.term === currentWord.term
//   );
//   if (index !== -1) {
//     // Check if the word was found
//     storedVocabulary[index].remove = true; // Update the 'remove' property
//   } else {
//     console.log("Word not found");
//   }

//   localStorage.setItem("vocabulary", JSON.stringify(storedVocabulary));

//   closeModal();
// };
// const closeEraseUserPrefs = () => {
//   localStorage.removeItem("userPreferences");
//   closeModal();
// };
