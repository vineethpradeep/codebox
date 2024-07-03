import { useQuestionContext } from "./QuestionContextApi";

function StartScreen() {
  const { numOfQuestions, dispatch } = useQuestionContext();
  return (
    <div className="start">
      <h2>Welcome to the React quiz! </h2>
      <h3>{numOfQuestions} Question to test you React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
export default StartScreen;
