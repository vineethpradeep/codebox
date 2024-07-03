import Options from "./Options";
import { useQuestionContext } from "./QuestionContextApi";

function Question() {
  const { questions } = useQuestionContext();
  console.log(questions);
  return (
    <>
      <h4>{questions.question}</h4>
      <Options />
    </>
  );
}
export default Question;
