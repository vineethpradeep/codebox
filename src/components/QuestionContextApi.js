import { createContext, useContext, useEffect, useReducer } from "react";

const SEC_PER_ANS = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_ANS,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "timmer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    default:
      throw new Error("Error");
  }
}

const QuestionContext = createContext();

function QuestionProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const totalPoint = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(function () {
    fetch("https://vineethpradeep.github.io/codebox/db.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data.questions });
      })
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions: questions[index],
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numOfQuestions,
        maxPoints: totalPoint,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestionContext() {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("QuestionContext is parent of the QuestionProvider");
  return context;
}

export { QuestionProvider, useQuestionContext };
