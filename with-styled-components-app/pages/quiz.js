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
import AlternativesForm from '../src/Components/AlternativesForm';

function ResultWidget({
  results,
}) {
  return (
    <Widget>
      <Widget.Header>
        RESULTADO
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {
          results.filter((x) => x).length
          }
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li>
              #
              {index + 1}
              {' '}
              Resultado:
              { result === true ? ' Acertou' : ' Errou' }
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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
  addResults,
}) {
  // const [questionIndex, setQuestionIndex] = useState(0);
  const questionId = `question__${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [labelConfirm, setLabelConfirm] = useState('Confirmar');
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

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

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsFormSubmited(true);
            setLabelConfirm('PEW');
            setTimeout(() => {
              addResults(isCorrect);
              onSubmit();
              setIsFormSubmited(false);
              setLabelConfirm('Confirmar');
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-status={isFormSubmited && alternativeStatus}
                data-selected={isSelected}
              >
                <input
                  style={{ display: 'none'}}
                  name={questionId}
                  type="radio"
                  id={alternativeId}
                  onChange={() => {
                    setSelectedAlternative(alternativeIndex);
                  }}
                />
                {alternative}
              </Widget.Topic>

            );
          })}
          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
          >
            { labelConfirm }
          </Button>
          {isFormSubmited && isCorrect && <p>Você Acertou!</p>}
          {isFormSubmited && !isCorrect && <p>Você Errou!</p>}
        </AlternativesForm>

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestion = db.questions.length;
  const question = db.questions[currentQuestion];

  function addResults(result) {
    setResults([
      ...results,
      result,
    ]);
  }

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
            addResults={addResults}
          />
          )}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
