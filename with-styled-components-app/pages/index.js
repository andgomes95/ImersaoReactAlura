import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/Components/Widget'
import Footer from '../src/Components/Footer'
import GitHubCorner from '../src/Components/GitHubCorner'
import QuizBackground from '../src/Components/QuizBackground'
import QuizLogo from '../src/Components/QuizLogo'

//Title com styled component
// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

//Title com react puro
// function Title(props){
//   return (
//     <h1>{props.children}</h1>
//   );
// }


////Outro BG: "bg": "https://i.imgur.com/Vfq71Zl.png",
// const BackgroundImage  = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return(
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
      <QuizLogo></QuizLogo>
        <Widget>
          <Widget.Header>
            <h1>Genshin Impactado</h1>
          </Widget.Header>
          
          <Widget.Content>
            <p>HAIL THE PAIMON</p>
          </Widget.Content>
        </Widget>
        <Widget>
            <Widget.Content>
              <p>HAIL THE PAIMON</p>
            </Widget.Content>
        </Widget>
        <Footer/>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/andgomes95/ImersaoReactAlura"></GitHubCorner>
      
    </QuizBackground>
  );
}
