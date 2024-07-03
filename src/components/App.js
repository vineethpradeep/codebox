import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import Finished from "../Finished";
import Restart from "./Restart";
import Timer from "./Timer";
import { useQuestionContext } from "./QuestionContextApi";

function App() {
  const { status, questions } = useQuestionContext();
  console.log(questions);
  return (
    <div className="app">
      <div className="wrapper">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
              <ProgressBar />
              <Question />
              <NextButton />
              <Timer />
            </>
          )}
          {status === "finished" && (
            <>
              <Finished />
              <Restart />
            </>
          )}
        </Main>
        <div className="avatar">
          <img src="avatar.png" alt="Avatar" />
        </div>
      </div>
    </div>
  );
}

export default App;
