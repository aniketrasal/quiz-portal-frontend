import { Navbar } from "./Components/Navbar";
import { FullScreenQuiz } from "./Components/FullScreenQuiz";
import QuestionCard from "./Components/QuestionCard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <FullScreenQuiz>
        <QuestionCard />
      </FullScreenQuiz>
    </div>
  );
}

export default App;
