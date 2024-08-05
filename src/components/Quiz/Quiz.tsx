import errorIcon from "../../assets/images/icon-error.svg";
import "./quiz.css";

type QuizProps = {
  isGameEnded: boolean;
  quizTopicSelected: {
    title: string;
    icon: string;
    questions: {
      question: string;
      options: string[];
      answer: string;
    }[];
  } | null;
  totalQuestions: number | undefined;
  questionPosition: number;
  currentQuestion: string | undefined;
  chosenAnswer: string | null;
  correctAnswer: string | undefined;
  errorMessage: boolean;
  options: string[] | undefined;
  updateQuestion: () => null;
  updateChosenAnswer: (choice: string) => void;
  handleSubmit: () => void;
  hideSubmit: boolean;
  handleEnd: () => void;
};

const Quiz = ({
  isGameEnded,
  quizTopicSelected,
  totalQuestions,
  questionPosition,
  currentQuestion,
  chosenAnswer,
  correctAnswer,
  errorMessage,
  options,
  updateQuestion,
  updateChosenAnswer,
  handleSubmit,
  hideSubmit,
  handleEnd,
}: QuizProps) => {
  // Display all the available options to answer with
  const answerOptions = options?.map((option: string, optionID: number) => {
    return (
      <div
        className={`answer shadow ${
          chosenAnswer === option ? "answer--selected" : ""
        } ${option === correctAnswer && hideSubmit ? "answer--correct" : ""} ${
          chosenAnswer !== correctAnswer &&
          hideSubmit &&
          chosenAnswer === option
            ? "answer--incorrect"
            : ""
        } answer--mode`}
        onClick={() => updateChosenAnswer(option)}
        key={optionID}
      >
        <div className="answer__order heading--s">
          {["A", "B", "C", "D"][optionID]}
        </div>
        <p className="answer__text heading--s">{option}</p>
      </div>
    );
  });

  // Only begin quiz if topic is selected
  {
    return quizTopicSelected === null || isGameEnded ? null : (
      <section className="quiz">
        <div className="quiz__questions">
          <em className="question--position body--s">{`Question ${
            questionPosition + 1
          } of ${totalQuestions}`}</em>
          <h1 className="question heading--m">{currentQuestion}</h1>
          <input
            className="range"
            type="range"
            value={questionPosition}
            max={totalQuestions}
          />
        </div>
        <div className="quiz__answers">
          <div className="answers">{answerOptions}</div>
          {hideSubmit ? null : (
            <button className="btn heading--s" onClick={handleSubmit}>
              Submit Question
            </button>
          )}
          {chosenAnswer &&
          hideSubmit &&
          questionPosition + 1 !== totalQuestions ? (
            <button className="btn heading--s" onClick={updateQuestion}>
              Next Question
            </button>
          ) : null}

          {questionPosition + 1 === totalQuestions && hideSubmit ? (
            <button className="btn heading--s" onClick={handleEnd}>
              End Quiz
            </button>
          ) : null}
          {errorMessage ? (
            <div className="error--message">
              <img src={errorIcon} aria-hidden="true" />
              <p className="body--m">Please select an answer</p>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
};

export default Quiz;
