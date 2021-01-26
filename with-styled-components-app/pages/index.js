import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/Components/Widget';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import QuizBackground from '../src/Components/QuizBackground';
import QuizLogo from '../src/Components/QuizLogo';
import QuizContainer from '../src/Components/QuizContainer';

// Title com styled component
// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

// Title com react puro
// function Title(props){
//   return (
//     <h1>{props.children}</h1>
//   );
// }

/// /Outro BG: "bg": "https://i.imgur.com/Vfq71Zl.png",
// const BackgroundImage  = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Genshin Impactado</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (e) {
              e.preventDefault();
              // Router manda para a proxima pagina
              router.push(`/quiz?name=${name}`);
            }}
            >
              <input
                placeholder="Coloque seu nome"
                onChange={function (e) {
                  setName(e.target.value);
                }}
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <p>HAIL THE PAIMON</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/andgomes95/ImersaoReactAlura" />

    </QuizBackground>
  );
}
