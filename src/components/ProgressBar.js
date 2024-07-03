import { useQuestionContext } from "./QuestionContextApi";

function ProgressBar() {
  const { index, points, answer, maxPoints, numOfQuestions } =
    useQuestionContext();
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
