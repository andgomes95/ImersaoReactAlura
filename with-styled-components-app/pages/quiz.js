/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import db from '../db.json';
import QuizBackground from '../src/Components/QuizBackground';
import Widget from '../src/Components/Widget';
import QuizContainer from '../src/Components/QuizContainer';
import QuizLogo from '../src/Components/QuizLogo';
import Button from '../src/Components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestion,
  questionIndex,
  onSubmit,
}) {
  // const [questionIndex, setQuestionIndex] = useState(0);
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          { `Pergunta ${questionIndex + 1} de ${totalQuestion}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h1>
          {question.title}
        </h1>
        <p>
          {question.description}
        </p>
        <br />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  // style={{ display: 'none'}}
                  name={questionId}
                  type="radio"
                  id={alternativeId}
                />
                {alternative}
              </Widget.Topic>

            );
          })}
          <Button type="submit"> Confirmar</Button>
        </form>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestion = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = db.questions[currentQuestion];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmit() {
    if (currentQuestion + 1 < totalQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.QUIZ
          && (
          <QuestionWidget
            question={question}
            totalQuestion={totalQuestion}
            questionIndex={currentQuestion}
            onSubmit={handleSubmit}
          />
          )}
        {screenState === screenStates.RESULT && <div> Jogo será completo em breve ;)</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
