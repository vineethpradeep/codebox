import { useQuestionContext } from "./components/QuestionContextApi";

function Finished() {
  const { points, maxPoints, highscore } = useQuestionContext();
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints}(
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore : {highscore}</p>
    </>
  );
}
export default Finished;
