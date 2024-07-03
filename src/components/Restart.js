import { useQuestionContext } from "./QuestionContextApi";

function Restart() {
  const { dispatch } = useQuestionContext();
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "restart" })}
    >
      Restart Quiz
    </button>
  );
}

export default Restart;
