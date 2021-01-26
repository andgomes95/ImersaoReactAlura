/* eslint-disable linebreak-style */
import React from 'react';
import db from '../db.json';
import QuizBackground from '../src/Components/QuizBackground';
import GitHubCorner from '../src/Components/GitHubCorner';
import Widget from '../src/Components/Widget';
import QuizContainer from '../src/Components/QuizContainer';

export default function Quiz() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <GitHubCorner projectUrl="https://github.com/andgomes95/ImersaoReactAlura" />
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Pergunta 1 de 15</h1>
          </Widget.Header>
          <Widget.Content>
            <p>HAIL THE PAIMON</p>
          </Widget.Content>
        </Widget>
      </QuizContainer>
    </QuizBackground>
  );
}
