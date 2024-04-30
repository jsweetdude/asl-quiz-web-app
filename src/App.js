import "./App.css";
import Navbar from "./components/Navbar";
import QuizWord from "./components/QuizWord";
import QuizMode from "./components/QuizMode";
import CategoriesToolbar from "./components/CategoriesToolbar";
import "bootstrap/dist/css/bootstrap.css";
import QuizResponses from "./components/QuizResponses";
import vocabularyList from "./data.js";
import { useEffect } from "react";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {
  const categoryList = Array.from(
    new Set(vocabularyList.map((word) => word.category))
  );

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   console.log(categoryList);
  // });

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
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
