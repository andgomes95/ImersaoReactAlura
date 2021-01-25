import styled from 'styled-components'

//Title com styled component
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

//Title com react puro
// function Title(props){
//   return (
//     <h1>{props.children}</h1>
//   );
// }

export default function Home() {
  return <Title>My page</Title>
}
